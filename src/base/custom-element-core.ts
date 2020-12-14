/* eslint-disable @typescript-eslint/no-var-requires */
// eslint-disable-next-line @typescript-eslint/no-unused-vars

import { hasObjectChanged } from "../helper/custom-element-util";

import { init } from 'snabbdom/build/package/init'
import { classModule } from 'snabbdom/build/package/modules/class'
import { propsModule } from 'snabbdom/build/package/modules/props'
import { styleModule } from 'snabbdom/build/package/modules/style'
import { eventListenersModule } from 'snabbdom/build/package/modules/eventlisteners'
import { toVNode } from 'snabbdom/build/package/tovnode'
import { VNode } from "snabbdom/build/package/vnode";

const patch = init([ // Init patch function with chosen modules
    classModule, // makes it easy to toggle classes
    propsModule, // for setting properties on DOM elements
    styleModule, // handles styling on elements with support for animations
    eventListenersModule, // attaches event listeners
])

export interface CustomElementComponent {
    setStyle: () => string;
    render: () => any;
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
        // convert kebab case to camel case
        const propName = name.replace(/-./g, x=>x.toUpperCase()[1])
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (newValue !== oldValue && (this as any)[propName] !== undefined)
           {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                (this as any)[propName] = newValue;
           }
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
        const vNode = patch(
            toVNode(this.element as Node),
            ((this as unknown) as CustomElementComponent).render() as VNode
        );
    }
}
