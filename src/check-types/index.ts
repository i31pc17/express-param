import _ from 'lodash';
import string from "./string";
import number from "./number";
import int from "./int";
import uint from "./uint";
import float from "./float";
import ufloat from "./ufloat";
import date from "./date";
import datetime from "./datetime";
import base64 from "./base64";
import ipv4 from "./ipv4";
import email from "./email";
import phone from "./phone";
import enumType from "./enum";

export const numberType = ['number', 'int', 'uint', 'float', 'ufloat'];

export function check(type: string, value: any) {
    if (value === null || value === undefined) {
        return false;
    }
    switch (type) {
        case 'string': return string(value);
        case 'number': return number(value);
        case 'int': return int(value);
        case 'uint': return uint(value);
        case 'float': return float(value);
        case 'ufloat': return ufloat(value);
        case 'date': return date(value);
        case 'datetime': return datetime(value);
        case 'base64': return base64(value);
        case 'ipv4': return ipv4(value);
        case 'email': return email(value);
        case 'phone': return phone(value);
    }
    if (_.startsWith(type, 'enum(') && _.endsWith(type, ')')) {
        return enumType(value, type);
    }
    if (type && type !== 'any') {
        return false;
    }
    return true;
}
