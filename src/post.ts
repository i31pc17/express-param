import _ from 'lodash';
import parse from "./parse";

export default function (req: any, ...keys) {
    const body = _.get(req, 'body', {});
    return parse(body, keys);
};