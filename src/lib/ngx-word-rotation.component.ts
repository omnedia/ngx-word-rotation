import { animate, style, transition, trigger } from "@angular/animations";
import { CommonModule } from "@angular/common";
import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { interval, Subject, takeUntil } from "rxjs";

@Component({
  selector: "om-word-rotation",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./ngx-word-rotation.component.html",
  styleUrl: "./ngx-word-rotation.component.scss",
  animations: [
    trigger("rotateWords", [
      transition(":enter", [
        style({ transform: "translateY(-100%)", opacity: 0 }),
        animate(
          "0.2s ease-in",
          style({ transform: "translateY(0)", opacity: 1 })
        ),
      ]),
      transition(":leave", [
        style({ transform: "translateY(0)", opacity: 1 }),
        animate(
          "0.2s ease-out",
          style({ transform: "translateY(100%)", opacity: 0 })
        ),
      ]),
    ]),
    trigger("rotateWordsReverse", [
      transition(":enter", [
        style({ transform: "translateY(100%)", opacity: 0 }),
        animate(
          "0.2s ease-in",
          style({ transform: "translateY(0)", opacity: 1 })
        ),
      ]),
      transition(":leave", [
        style({ transform: "translateY(0)", opacity: 1 }),
        animate(
          "0.2s ease-out",
          style({ transform: "translateY(-100%)", opacity: 0 })
        ),
      ]),
    ]),
  ],
})
export class NgxWordRotationComponent implements OnInit, OnDestroy {
  @Input("words")
  words!: string[];

  @Input("reverseAnimation")
  reverseAnimation: boolean = false;

  @Input("wordDelay")
  set wordDelay(wordDelay: number) {
    if (wordDelay < 500) {
      this.wordDelaySpeed = 500;
      return;
    }

    this.wordDelaySpeed = wordDelay;
  }

  private wordDelaySpeed: number = 2500;

  @Input("enterDelay")
  set enterDelay(enterDelay: number) {
    if (this.wordDelaySpeed - enterDelay < 500) {
      this.enterDelaySpeed = 200;
    }

    this.enterDelaySpeed = enterDelay;
  }

  private enterDelaySpeed: number = 200;

  protected word1?: string;
  protected word2?: string;

  ngOnInit(): void {
    if (!this.words || this.words.length <= 0) {
      throw new Error(
        "om-word-rotation: No words were passed to the component!"
      );
    }

    if (this.words.length === 1) {
      this.words = [...this.words, ...this.words];
    }

    this.word1 = this.words[0];

    this.rotateWords();
  }

  destroy$ = new Subject<void>();

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  rotateWords(): void {
    let wordsIndex = 0;

    interval(this.wordDelaySpeed)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        if (this.word1) {
          this.word1 = undefined;
          setTimeout(() => {
            this.word2 = this.words[wordsIndex];
          }, this.enterDelaySpeed);
        } else {
          this.word2 = undefined;

          setTimeout(() => {
            this.word1 = this.words[wordsIndex];
          }, this.enterDelaySpeed);
        }

        wordsIndex += 1;

        if (wordsIndex === this.words.length) {
          wordsIndex = 0;
        }
      });
  }
}
