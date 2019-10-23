const arr2tree = require('./index');
const isEqual = require('lodash/isEqual')
const array = [{
    id: 1,
    name: '蔬菜',
    order: 1
},
{
    id: 2,
    name: '土豆',
    pid: 1,
    order: 2
}, {
    id: 3,
    name: '豆角',
    pid: 1,
    order: 1
}, {
    id: 4,
    name: '水果',
    order: 2
}
];

const tree = arr2tree(array);

const comparedTree = [ { id: 1, name: '蔬菜', order: 1 },
{ id: 2, name: '土豆', pid: 1, order: 2 },
{ id: 3, name: '豆角', pid: 1, order: 1 },
{ id: 4, name: '水果', order: 2 } ];

if(!isEqual(comparedTree, tree)){
    throw '😿  测试不通过!'
} else {
    console.log('🚀  通过测试!')
}