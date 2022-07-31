import _ from 'lodash';

export default function (value: any) {
    const chkValue = _.toNumber(value);
    if (_.isNaN(chkValue)) {
        return false;
    }
    if (!_.isInteger(chkValue)) {
        return false;
    }
    if (chkValue < 0) {
        return false;
    }
    return true;
}