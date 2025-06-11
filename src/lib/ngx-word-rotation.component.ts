import {CommonModule, isPlatformBrowser} from "@angular/common";
import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  Input,
  OnDestroy,
  PLATFORM_ID,
  QueryList,
  signal,
  ViewChild,
  ViewChildren
} from "@angular/core";
import {interval, Subject, Subscription, takeUntil} from "rxjs";

@Component({
  selector: "om-word-rotation",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./ngx-word-rotation.component.html",
  styleUrl: "./ngx-word-rotation.component.scss",
})
export class NgxWordRotationComponent implements AfterViewInit, OnDestroy {
  @ViewChild("OmWordRotationWrapper") wordRotationRef!: ElementRef<HTMLElement>;
  @ViewChildren('OmRotatingWords') wordsRef!: QueryList<ElementRef<HTMLElement>>;

  @Input("styleClass")
  styleClass?: string;

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

  @Input("animationSpeed")
  set animationSpeed(animationSpeed: number) {
    if (this.wordDelaySpeed - animationSpeed < 500) {
      this.style.update(prev => ({...prev, '--om-word-rotation-speed': 200 + 'ms'}));
    }

    this.style.update(prev => ({...prev, '--om-word-rotation-speed': animationSpeed + 'ms'}));
  }

  style = signal({});

  longestWord = signal('');
  activeIndex = signal(-1);
  inactiveIndex = signal(1);

  isInView = signal(false);
  private intersectionObserver?: IntersectionObserver;
  private rotationInterval?: Subscription;

  constructor(
    @Inject(PLATFORM_ID) private platformId: object
  ) {
  }

  ngAfterViewInit(): void {
    if (!this.words || this.words.length <= 0) {
      throw new Error(
        "om-word-rotation: No words were passed to the component!"
      );
    }

    let longestWidth = 0;
    let longestWord = '';
    this.wordsRef.forEach((wordRef, index) => {
      const width = wordRef.nativeElement.getBoundingClientRect().width;

      if (width > longestWidth) {
        longestWord = this.words[index];
        longestWidth = width;
      }
    });

    this.longestWord.set(longestWord);

    if (this.words.length === 1) {
      this.words = [...this.words, ...this.words];
    }

    if (isPlatformBrowser(this.platformId)) {
      this.intersectionObserver = new IntersectionObserver(([entry]) => {
        const wasInView = this.isInView();
        this.isInView.set(entry.isIntersecting);

        if (!wasInView && this.isInView()) {
          this.activeIndex.set(0);
          this.inactiveIndex.set(this.words.length - 1);
          this.rotateWords();
        }

        if (wasInView && !this.isInView()) {
          this.rotationInterval?.unsubscribe();
          this.rotationInterval = undefined;
          this.activeIndex.set(-1);
          this.inactiveIndex.set(1);
        }
      });
      this.intersectionObserver.observe(this.wordRotationRef.nativeElement);
    }
  }

  destroy$ = new Subject<void>();

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  rotateWords(): void {
    this.rotationInterval = interval(this.wordDelaySpeed)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.activeIndex.set((this.activeIndex() + 1) % this.words.length);
        let inactiveIndex = this.activeIndex() - 1;

        if (inactiveIndex < 0) {
          inactiveIndex = this.words.length - 1;
        }

        this.inactiveIndex.set(inactiveIndex);
      });
  }
}
