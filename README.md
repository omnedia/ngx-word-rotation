# ngx-word-rotation

<a href="https://ngxui.com" target="_blank" style="display: flex;gap: .5rem;align-items: center;cursor: pointer; padding: 0 0 0 0; height: fit-content;">
  <img src="https://ngxui.com/assets/img/ngxui-logo.png" style="width: 64px;height: 64px;">
</a>

This Library is part of the NGXUI ecosystem. <br>
View all available components at https://ngxui.com

`@omnedia/ngx-word-rotation` is an Angular library designed to facilitate word rotation animations within Angular applications.

## Features

- Rotate words within your Angular application.
- Easily customizable.

## Installation

Install the library using npm:

```bash
npm install @omnedia/ngx-word-rotation
```

## Usage

Import the `NgxWordRotationComponent` in your Angular module:

```typescript
import {NgxWordRotationComponent} from '@omnedia/ngx-word-rotation';

@Component({
  ...
    imports:
[
  ...
    NgxWordRotationComponent,
],
...
})
```

Use the component in your template:

```html

<om-word-rotation [words]="['Hello', 'World']"></om-word-rotation>
```

## API

```html

<om-word-rotation
  [words]="words"
  [reverseAnimation]="reverseAnimation"
  [wordDelay]="wordDelay"
  [animationSpeed]="animationSpeed"
  styleClass="your-custom-class"
></om-word-rotation>
```

Starts the word rotation effect.

- `words`: An array of strings to be animated.
- `reverseAnimation`: (optional): Reverses the animation direction. Default is false.
- `wordDelay`: (optional): The delay between the animation to the next word / how long a word stays in milliseconds. Default is 2500.
- `animationSpeed`: (optional): The animation speed for the entering word in milliseconds. Default is 250.
- `styleClass`: (optional): Add a class to the `<div>` wrapper tag.

## Contributing

Contributions are welcome. Please submit a pull request or open an issue to discuss your ideas.

## License

This project is licensed under the MIT License.

For more information, visit the [GitHub repository](https://github.com/omnedia/ngx-word-rotation)
