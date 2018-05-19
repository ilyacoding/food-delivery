const componentType = function (component) {
    return function validate(props, key, parentComponentName) {
        const prop = props[key];
        if (!(prop.type.prototype instanceof (component))) {
            return new Error(
                `Expected component of type \`${component.name}\` in component \`${parentComponentName}\`, but received \`${prop.type.name}\`.`
            );
        }
    };
};

export default componentType;