import { FaSizes } from "./faSizeConstants";

const isFaSize = (props, propName, componentName) => {
    const item = props[propName];
    const faSizesKeys = Object.values(FaSizes);
    if (faSizesKeys.findIndex(sizeKey => sizeKey === item) == -1) {
        return new Error(`${componentName}: ${item} isn't contained in FaSizes enum.`);
    }
};

export default isFaSize;