import _ from 'lodash';

export default function (value: any, enumKeys: string) {
    const enums = _.split(enumKeys.substring(5, enumKeys.length - 1), ',');
    _.forEach(enums, (_item, _index) => {
        enums[_index] = _.trim(_item);
    });
    if (!_.includes(enums, value)) {
        return false;
    }
    return true;
};
