import _ from 'lodash';

export default function (value: any) {
    const chkValue = _.toNumber(value);
    if (_.isNaN(chkValue)) {
        return false;
    }
    return true;
}