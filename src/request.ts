import _ from 'lodash';
import parse from "./parse";

export default function (req: any, ...keys) {
    const query = _.get(req, 'query', {});
    const params = _.get(req, 'params', {});
    const body = _.get(req, 'body', {});
    const array = { ...body, ...params, ...query };
    return parse(array, keys);
};
