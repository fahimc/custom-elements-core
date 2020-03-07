/**
 * hasObjectChanged is a shallow compare of two objects 
 * @param object1 The object to compare against
 * @param object2 The new state of the object
 */
export const hasObjectChanged = (object1: Object, object2: Object) => {
    return !(Object.keys(object1).length === Object.keys(object2).length &&
    Object.keys(object1).every(key => 
        object2.hasOwnProperty(key) && object1[key] === object2[key]
    ));
}