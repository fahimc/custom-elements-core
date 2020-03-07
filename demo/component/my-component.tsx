/** @jsx Snabbdom.createElement */
import Snabbdom from 'snabbdom-pragma'
// import {createElement} from '@turtlemay/jsx-dom';
import {CustomElement,CustomElementCore, Prop} from '../../src/index';
export interface MyComponentState {
    name:string;
}
export interface MyComponentProps {
    name:string;
    data:any;
}

@CustomElement(
    {
        selector: 'my-component'
    }
)
export class MyComponent extends CustomElementCore<MyComponentProps, MyComponentState> {
    @Prop()
    public name: string = '';
    @Prop()
    public info: any = {};
    constructor(){
        super();
        this.state = {
            name: 'Tom',
        }
       
    }
    public render(){
    return <div >Hello World <span>{this.props.name}</span></div>
    }
}
