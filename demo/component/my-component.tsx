/** @jsx Snabbdom.createElement */
import Snabbdom from 'snabbdom-pragma'
import {CustomElement,CustomElementCore, Prop, CustomElementComponent} from '../../src/index';
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
export class MyComponent extends CustomElementCore<MyComponentProps, MyComponentState> implements CustomElementComponent {
    @Prop()
    public name: string = '';
    @Prop()
    public info: any = {};
    constructor(){
        super();
        this.state = {
            name: 'Tom',
        }
       
        this.setState({
            name: 'John'
        });
    }
    public setStyle(){
        return `
            * {
                background-color: red;
            }
        `;
    }
    public render(){
    return <div style={{fontSize:  '22px'}} >Hello World <span>{this.props.name}</span></div>
    }
}
