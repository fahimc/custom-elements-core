import 'reflect-metadata';
export interface CustomElementConfig {
    selector: string;
}
export const CustomElement = (config: CustomElementConfig) => (constructor: any) => {
    Object.defineProperty(constructor, 'observedAttributes', {
        get: () => {
            return constructor.PropList;
        }
    });
    customElements.define(config.selector, constructor);
}

export const Prop = () => {
    return (target:any, propertyName: string) => {
        if(!target.props) target.props = {};
        if(!target.constructor.PropList) target.constructor.PropList = [];
        var t = Reflect.getMetadata("design:type", target, propertyName);
        console.log(t);
        target.constructor.PropList.push(propertyName);
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