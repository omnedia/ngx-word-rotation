# ngx-word-rotation

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

import { NgxWordRotationComponent } from '@omnedia/ngx-word-rotation';

@NgModule({
  imports: [
    NgxWordRotationComponent
  ],
})
export class AppModule { }
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
  [enterDelay]="enterDelay"
  styleClass="your-custom-class"
></om-word-rotation>
```

Starts the word rotation effect.

- `words`: An array of strings to be animated.
- `reverseAnimation`: (optional): Reverses the animation direction. Default is false.
- `wordDelay`: (optional): The delay between the animation to the next word / how long a word stays in milliseconds. Default is 2500.
- `enterDelay`: (optional): The animation delay for the entering word in milliseconds. Default is 200.
- `styleClass`: (optional): Add a class to the `<div>` wrapper tag.

## Contributing

Contributions are welcome. Please submit a pull request or open an issue to discuss your ideas.

## License

This project is licensed under the MIT License.

For more information, visit the [GitHub repository](https://github.com/omnedia/ngx-word-rotation)