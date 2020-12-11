/* eslint-disable @typescript-eslint/no-var-requires */
/** @jsxRuntime classic */
/** @jsx Snabbdom.createElement */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Snabbdom from "snabbdom-pragma";
import { init } from "snabbdom";
import { toVNode } from "snabbdom/tovnode";
import { hasObjectChanged } from "../helper/custom-element-util";
import { VNode } from "snabbdom/vnode";
const patch = init([
    // Init patch function with chosen modules
    require("snabbdom/modules/class").default, // makes it easy to toggle classes
    require("snabbdom/modules/props").default, // for setting properties on DOM elements
    require("snabbdom/modules/style").default, // handles styling on elements with support for animations
    require("snabbdom/modules/eventlisteners").default, // attaches event listeners
]);

export interface CustomElementComponent {
    setStyle: () => string;
    render: () => JSX.Element;
}
/**
 * Base class for custom elements.
 * Provides virtual dom, state management and props.
 */
export class CustomElementCore<P = Record<string, unknown>, S = Record<string, unknown>> extends HTMLElement {
    /**
   * Element that renders the content
   */
    public element: HTMLElement;
    /**
   *
   */
    public styleElement: HTMLElement;
    private shadow: ShadowRoot;
    private internalState: S;
    private internalProps: P;
    public get state(): S {
        return this.internalState;
    }
    public set state(newState: S) {
        this.internalState = newState;
    }
    public get props(): P {
        return this.internalProps;
    }
    public set props(newProp: P) {
        this.internalProps = newProp;
    }
    constructor() {
        super();
        this.state = {} as S;
        this.internalState = {} as S;
        this.internalProps = {} as P;
        this.element = document.createElement("div");
        this.styleElement = document.createElement("style");
        this.shadow = this.attachShadow({ mode: "open" });
        this.shadow.appendChild(this.styleElement);
        this.shadow.appendChild(this.element);
    }

    public attributeChangedCallback(name: string, oldValue: string, newValue: string) : void {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (newValue !== oldValue && (this as any)[name] !== undefined)
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (this as any).props[name] = newValue;
    }
    public connectedCallback() : void {
        this.updateStyle();
        this.update();
    }
    public update():void {
        this.updateVDom();
    }
    public setState(newState: Partial<S>): void {
        const newStateObject = { ...this.internalState, ...newState };
        if (hasObjectChanged(this.internalState, newStateObject)) {
            this.internalState = newStateObject;
            this.update();
        }
    }
    public setProps(newProps: Partial<P>):void {
        const newPropObject = { ...this.internalProps, ...newProps };
        if (hasObjectChanged(this.internalProps, newPropObject)) {
            this.internalProps = newPropObject;
            this.update();
        }
    }
    public updateStyle(): void {
        if (((this as unknown) as any).setStyle) {
            this.styleElement.innerHTML = ((this as unknown) as CustomElementComponent).setStyle();
        }
    }
    private updateVDom() {
        patch(
            toVNode(this.element as Node),
            ((this as unknown) as CustomElementComponent).render() as VNode
        );
    }
}
