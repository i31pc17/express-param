import _ from 'lodash';

export default function (value: any) {
    if (!_.isString(value)) {
        return false;
    }
    return true;
}