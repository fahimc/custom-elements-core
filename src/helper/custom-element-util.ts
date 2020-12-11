/**
 * hasObjectChanged is a shallow compare of two objects
 * @param object1 The object to compare against
 * @param object2 The new state of the object
 */
export const hasObjectChanged = (object1: Object, object2: Object) => {
    return !(
        Object.keys(object1).length === Object.keys(object2).length &&
    Object.keys(object1).every(
        (key) =>
            object2.hasOwnProperty(key) &&
        (object1 as any)[key] === (object2 as any)[key]
    )
    );
};
/**
 * Convert an object with css selectors and properties to a string
 * @param style and object with css selectors and properties
 * Example:
 *  [`*`]: {
        [`background-color`]: "red",
      },
 */
export const styleObjectToString = (style: {
    [key: string]: { [prop: string]: string };
}): string => {
    return Object.keys(style)
        .map((key) => {
            return `
        ${key} {
            ${Object.keys(style[key])
        .map((prop) => {
            return `
                    ${camelToKebabCase(prop)} : ${style[key][prop]};
                `;
        })
        .join("")}
        }
      `;
        })
        .join("");
};

export const camelToKebabCase = (key: string): string => {
    return key
        .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
        .replace(/([A-Z])([A-Z])(?=[a-z])/g, "$1-$2")
        .toLowerCase();
};
