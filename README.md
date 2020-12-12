<img alt="CustomElementsCore" src="design/logo.png">

This is a Typescript base class to create native custom element components. It's a small base class but packed with essential features.
The goal is to provide the basic functionality required for most components making it close to the native implementation as possible.

This base class comes with a decorator, virtual dom, jsx, state management and react like props.

# Virtual Dom

This library uses [Snabbdom](https://github.com/snabbdom/snabbdom) under the hood for virtual DOM rendering with `snabbdom-pragma` for JSX.

# JSX

JSX support comes from `snabbdom-pragma` which is used as the JSX factory in typescript.

# TypeScript Decorator

This library includes a TypeScript decorator.

Register a Component as a Native Custom Element using `@CustomElement()`:

```ts
import {
  CustomElementCore,
  CustomElementComponent,
  CustomElement,
} from "custom-element-core";

@CustomElement({
  selector: "my-component",
})
export class MyComponent
  extends CustomElementCore<{}, {}>
  implements CustomElementComponent {}
```

Add a prop using `@Prop()` .

```ts
 @Prop()
    public name: string = '';
```

Under the hood this creates a setter and a getter for the variable and executes `update()` when the prop value changes,

# Base Class `CustomElementCore`

This class provides state management, attribute binding to props, JSX, virtual dom rendering, style changes handler and handling of state changes. It's very lightweight and intented to do as little as possible to provide core functionality but not add to much to the custom element lifecyce.

## Example

```ts
/** @jsx Snabbdom.createElement */
import Snabbdom from "snabbdom-pragma";
import {
  CustomElement,
  CustomElementCore,
  Prop,
  CustomElementComponent,
} from "custom-element-core";

export interface MyComponentState {
  name: string;
}
export interface MyComponentProps {
  name: string;
  data: any;
}

@CustomElement({
  selector: "my-component",
})
export class MyComponent
  extends CustomElementCore<MyComponentProps, MyComponentState>
  implements CustomElementComponent {
  @Prop()
  public name: string = "";

  constructor() {
    super();
    this.state = {
      name: "Tom",
    };
  }

  public setStyle() {
    return `
            * {
                background-color: red;
            }
        `;
  }

  public render() {
    return (
      <div style={{ fontSize: "22px" }}>
        My Name is <span>{this.props.name}</span>
      </div>
    );
  }
}
```
