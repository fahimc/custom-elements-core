/** @jsx Snabbdom.createElement */
import Snabbdom from "snabbdom-pragma";
import {
  CustomElement,
  CustomElementCore,
  Prop,
  CustomElementComponent,
  styleObjectToString,
} from "../../src/index";

export interface MyComponentState {
  name: string;
}
export interface MyComponentProps {
  name: string;
  data: any;
  buttontype?:string;
}

@CustomElement({
  selector: "my-component",
})
export class MyComponent
  extends CustomElementCore<MyComponentProps, MyComponentState>
  implements CustomElementComponent {
  @Prop()
  public name: string = "";
  @Prop()
  public buttontype: string = "";
  @Prop()
  public info: any = {};

  constructor() {
    super();
    this.state = {
      name: "Tom",
    };
  }

  public setStyle() {
    return styleObjectToString({
      [`*`]: {
        [`background-color`]: "red",
        color: "white",
        padding: "10px",
        [`font-family`]: "Arial",
        marginTop: "10px",
      },
    });
  }

  public render() {
    console.log(this.props);
    return (
      <div className={'test'}>
        <p>Hello World </p>
        <span>hello</span>
      </div>
    );
  }
}
