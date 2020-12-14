import 'reflect-metadata';

export interface CustomElementConfig {
    selector: string;
}
/**
 * This is a decorator to define a custom element and to set the observedAttributes
 * @param config provide the configurations for the element
 */

export const CustomElement = (config: CustomElementConfig) => (constructor: any): void => {
    Object.defineProperty(constructor, 'observedAttributes', {
        get: () => {
            return constructor.PropList;
        }
    });
    customElements.define(config.selector, constructor);
}

export const Prop = () => {
    return (target:any, propertyName: string) => {
        // Add a props and PropList object if it doesnt exist 
        if(!target.props) target.props = {};
        // PropList should be created if is doesn't exist
        if(!target.constructor.PropList) target.constructor.PropList = [];
        // Convert camelcase to kebab case for attributes
        const propName = propertyName.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`);
        // Add the propertyName to the PropList so it can be observed 
        target.constructor.PropList.push(propName);
        // Proxy the property setter to call update when prop is set
        Object.defineProperty(target, propertyName, {
            set(value){
                this.props[propertyName] = value;
                if(this.update)this.update();
            },
            get(){
                return this.props[propertyName];
            }
        });
    }
}