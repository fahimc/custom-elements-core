/** @jsx Snabbdom.createElement */
import Snabbdom from 'snabbdom-pragma';
import { CustomElementCore, CustomElement } from "../../src";

@CustomElement({
    selector: 'my-container'
})
export class Container extends CustomElementCore {
    render(){
        return (<div>
            <my-component on-click={this.onClick}  name={'New Name'} info={{
                name:'Adam'
            }}></my-component>
        </div>);
    }
    private onClick = () =>{
        console.log('clicked:my-component');
    }
}