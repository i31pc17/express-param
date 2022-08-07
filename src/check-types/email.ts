import _ from "lodash";

export default function (value: any) {
    if (!_.isString(value)) {
        return false;
    }
    const regexp = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    if (!regexp.test(value)) {
        return false;
    }
    if (value.length > 320) {
        return false;
    }
    return true;
};
