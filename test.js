const arr2tree = require('./dist/index.js').default;
const isEqual = require('lodash/isEqual')
const array = [{
    id: 1,
    name: '蔬菜',
    order: 21,
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
    order: 11
}
];

const tree = arr2tree(array, {
    isRoot(node) {
        return !node.pid
    }
});

const comparedTree = [{
    "id": 4,
    "name": "水果",
    "order": 11,
}, {
    "id": 1,
    "name": "蔬菜",
    "order": 21,
    "children": [{
        "id": 3,
        "name": "豆角",
        "pid": 1,
        "order": 1,
        
    },
    {
        "id": 2,
        "name": "土豆",
        "pid": 1,
        "order": 2,
    }
    ],
}];

// console.log(comparedTree);


// console.log(tree);

if (!isEqual(comparedTree, tree)) {
    console.log(JSON.stringify(tree, null, 4));

    throw '😿  测试不通过!';
} else {
    console.log('🚀  通过测试!')
}




// const array2 = [{
//     xid: 1,
//     xname: '蔬菜',
//     order: 2,
//     pid:-1,
// },
// {
//     xid: 2,
//     xname: '土豆',
//     xpid: 1,
//     order: 2
// }, {
//     xid: 3,
//     xname: '豆角',
//     xpid: 1,
//     order: 1
// }, {
//     xid: 4,
//     xname: '水果',
//     order: 1,
//     pid:-1,
// }
// ];


// const tree2 = arr2tree(array2,{KEY_ID:'xid',KEY_PID:'xpid',isRoot:node=>node.pid == -1});
// console.log(tree2);