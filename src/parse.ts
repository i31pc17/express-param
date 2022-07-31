import _ from 'lodash';
import keyParse from "./keyParse";

export default function (array: any, keys: string | string[]) {
    let arrKey = false;
    if (keys.length === 1 && _.isArray(keys[0])) {
        arrKey = true;
        keys = keys[0];
    }

    const count = keys.length;
    if (count <= 0) {
        return null;
    }

    if (count === 1 && !arrKey) {
        const result = keyParse(array, keys[0]);
        return result.value;
    }

    const results = {};
    _.forEach(keys, (key) => {
        const result = keyParse(array, key);
        if (!_.isUndefined(result.value)) {
            _.set(results, result.key, result.value);
        }
    });

    return results;
}