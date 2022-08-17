import Param from "../dist/index.mjs";

const array = {
    number: '123',
    date: '2019-11-01',
    ip: '111.11.1.1',
    number2: 'abcd',
    nono: null
};

const params = Param.p(array, [
    'number:int',
    'date:date',
    'ip:string',
    'number2:int',
    'none:string',
    'none2:string:?',
    'nono->aaa:int:?'
]);

console.log('123123', params);
