import _ from 'lodash';
import {numberType, check} from "./types";

export default function (array: any, checkKey: string | string[]) {
    let key = '';
    if (_.isArray(checkKey)) {
        const arrSize = _.size(checkKey);
        if (arrSize >= 1) {
            let arrKey = checkKey[0];
            if (arrSize >= 2) {
                if (_.isArray(checkKey[1]) && _.size(checkKey[1]) > 0) {
                    arrKey = `${arrKey}:enum(${_.join(checkKey[1], ',')})`;
                } else {
                    arrKey = `${arrKey}:${checkKey[1]}`;
                }
            }
            if (arrSize >= 3) {
                arrKey = `${arrKey}:${checkKey[2]}`;
            }
            key = arrKey;
        }
    } else {
        key = checkKey;
    }

    const exKey = _.split(_.trim(key), ':');
    key = _.trim(exKey[0]);
    let keyName = key;
    const exKeyName = _.split(key, '->');
    if (exKeyName.length === 2) {
        key = exKeyName[0];
        keyName = exKeyName[1];
    }

    const types = _.isUndefined(exKey[1]) ? ['any'] : _.split(_.trim(exKey[1]), '|');
    let defaultVal = null;
    if (exKey.length >= 2) {
        defaultVal = _.join(_.slice(exKey, 2), ':');
    }

    let value = _.get(array, key);

    // extended: false 예외처리
    if (!value) {
        let chkArray = false;
        let chkAny = false;
        _.forEach(types, (_type) => {
            if (_.endsWith(_type, '[]')) {
                chkArray = true;
                return false;
            }
            if (_.startsWith(_type, 'any')) {
                chkAny = true;
                return false;
            }
        });
        if (chkArray || chkAny) {
            const array2 = {};
            _.forEach(array, (_val, _key) => {
                if (_.startsWith(_key, `${key}[`) && _.endsWith(_key, ']')) {
                    _.set(array2, _key, _val);
                }
            });
            value = _.get(array2, key);
        }
    }

    if (!_.isUndefined(value)) {
        let chk = false;
        _.forEach(types, (_type) => {
            if (_.endsWith(_type, '[]')) {
                if (!_.isArray(value)) {
                    return;
                }
                let arrType = _type.substring(0, _type.length - 2);
                const isTrim = _.endsWith(arrType, '.trim');
                if (isTrim) {
                    arrType = arrType.substring(0, arrType.length - 5);
                }

                const value2 = [];
                _.forEach(value, (val) => {
                    if (!check(arrType, val)) {
                        return;
                    }

                    if (_.includes(numberType, arrType)) {
                        val = _.toNumber(val);
                    }

                    value2.push(isTrim ? _.trim(val) : val);
                });

                if (value2.length > 0) {
                    value = value2;
                    chk = true;
                    return false;
                }
            } else {
                if (_.isArray(value) && _type !== 'any') {
                    return;
                }

                if (_.endsWith(_type, '.trim')) {
                    _type = _type.substring(0, _type.length - 5);
                    value = _.trim(value);
                }

                if (check(_type, value)) {
                    if (_.includes(numberType, _type)) {
                        value = _.toNumber(value);
                    }

                    chk = true;
                    return false;
                }
            }
        });

        if (!chk) {
            value = false;
        }
    } else {
        value = null;
    }

    if (_.isNull(value) || value === false) {
        if (!_.isNull(defaultVal) && defaultVal !== null && defaultVal.length > 0) {
            if (defaultVal === '[]') {
                value = [];
            } else if (defaultVal === '{}') {
                value = {};
            } else if (defaultVal === '""' || defaultVal === '\'\'') {
                value = '';
            } else if (
                (_.startsWith(defaultVal, '[') && _.endsWith(defaultVal, ']'))
                || (_.startsWith(defaultVal, '{') && _.endsWith(defaultVal, '}'))
            ) {
                const decode = JSON.parse(defaultVal);
                if (decode) {
                    value = decode;
                }
            } else if (defaultVal === '?') {
                value = undefined;
            } else if (!_.isNaN(_.toNumber(defaultVal)) && _.size(_.intersection(types, numberType)) > 0) {
                value = _.toNumber(defaultVal);
            } else {
                value = defaultVal;
            }
        }
    }

    return {
        key: keyName,
        value,
    };
};