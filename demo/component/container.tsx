/** @jsx Snabbdom.createElement */
import Snabbdom from "snabbdom-pragma";
import { CustomElementCore, CustomElement } from "../../src";

interface ContainerState {
  name: string;
}

@CustomElement({
  selector: "my-container",
})
export class Container extends CustomElementCore<{}, ContainerState> {
  constructor() {
    super();
    this.state = {
      name: "Initial Name",
    };
  }
  connectedCallback() {
    super.connectedCallback();
    setTimeout(
      () =>
        this.setState({
          name: "John",
        }),
      5000
    );
  }
  render() {
    return (
      <div>
        <my-component
          on-click={this.onClick}
          name={this.state.name}
          info={{
            name: "Adam",
          }}
        ></my-component>
      </div>
    );
  }
  private onClick = () => {
    console.log("clicked:my-component");
  };
}
