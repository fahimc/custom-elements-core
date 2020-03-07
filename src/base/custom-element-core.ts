import {hasObjectChanged} from "../helper/custom-element-util";
/** @jsx Snabbdom.createElement */
import Snabbdom from 'snabbdom-pragma'
import {init} from 'snabbdom';
import {toVNode} from 'snabbdom/tovnode';
const patch = init([ // Init patch function with chosen modules
    require('snabbdom/modules/class').default, // makes it easy to toggle classes
    require('snabbdom/modules/props').default, // for setting properties on DOM elements
    require('snabbdom/modules/style').default, // handles styling on elements with support for animations
    require('snabbdom/modules/eventlisteners').default, // attaches event listeners
  ]);

  export interface CustomElementComponent {
      setStyle: () => string;
      render: () => JSX.Element;
  }
/**
 * Base class for custom elements.
 * Provides virtual dom, state management and props.
 */
export class CustomElementCore<P={},S = {}> extends HTMLElement{
    /**
     * Element that renders the content
     */
    public element:HTMLElement;
    public styleElement:HTMLElement;
    private shadow:ShadowRoot;
    private internalState:S;
    private internalProps:P;
    public get state() : S {
        return this.internalState;
    }
    public set state(newState: S) {
        this.internalState = newState;
    }
    public get props() : P {
        return this.internalProps;
    }
    public set props(newState: P) {
        this.internalProps = newState;

    }
    constructor(){
        super();
        this.state = {} as S;
        this.element = document.createElement('div');
        this.styleElement = document.createElement('style');
        this.shadow = this.attachShadow({mode: 'open'});
        this.shadow.appendChild(this.styleElement);
        this.shadow.appendChild(this.element);
    }
    public attributeChangedCallback(name:string, oldValue:any, newValue:string){
        if(newValue !== oldValue && this[name] !== undefined) this[name] = newValue;
    }
    public connectedCallback(){
        this.updateStyle();
        this.update();
    }
    public update(){
        this.updateVDom();
    }
    public setState(newState:Partial<S>) {
        const newStateObject = {...this.internalState, ...newState};
        if(hasObjectChanged(this.internalState, newStateObject)) {
            this.internalState = newStateObject;
            this.update();
        }
    }
    public setProps(newProps:Partial<P>) {
        const newPropObject = {...this.internalProps, ...newProps};
        if(hasObjectChanged(this.internalProps, newPropObject)) {
            this.internalProps = newPropObject;
            this.update();
        }
    }
    public updateStyle(){
       if((this as unknown as CustomElementComponent).setStyle)this.styleElement.innerHTML = (this as unknown as CustomElementComponent).setStyle();
    }
    private updateVDom(){
        patch(toVNode(this.element), (this as unknown as CustomElementComponent).render());
    }
}