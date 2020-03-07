import {DiffDOM} from "diff-dom";
import {init} from 'snabbdom';
const patch = init([ // Init patch function with chosen modules
    require('snabbdom/modules/class').default, // makes it easy to toggle classes
    require('snabbdom/modules/props').default, // for setting properties on DOM elements
    require('snabbdom/modules/style').default, // handles styling on elements with support for animations
    require('snabbdom/modules/eventlisteners').default, // attaches event listeners
  ]);
  import {toVNode} from 'snabbdom/tovnode';
const diffDom = new DiffDOM();


export class CustomElementCore<P={},S = {}> extends HTMLElement{
    public element:HTMLElement;
    public container:HTMLElement;
    private shadow:ShadowRoot;
    private internalState:S;
    private internalProps:P;
    private isMounted: boolean = false;
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
        this.container = document.createElement('div');
        this.shadow = this.attachShadow({mode: 'open'});
        this.container.appendChild(this.element);
        this.shadow.appendChild(this.container);
    }
    public attributeChangedCallback(name:string, oldValue:any, newValue:string){
        console.log(name,newValue);
        if(newValue !== oldValue && this[name] !== undefined) this[name] = newValue;
    }
    public connectedCallback(){
        this.isMounted = true;
        console.log('connected')
        this.update();
    }
    public update(){
        console.log(this.props)
        this.updateVDom();
    }
    public setState(newState:Partial<S>) {
        this.internalState = {...this.internalState,...newState};
        this.update();
    }
    public setProps(newProps:Partial<P>) {
        this.internalProps = {...this.internalProps,...newProps};
        this.update();
    }
    private updateVDom(){
        patch(toVNode(this.element), (this as any).render());
    }
}