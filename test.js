const arr2tree = require('./index');
const isEqual = require('lodash/isEqual')
const array = [{
        id: 1,
        name: '蔬菜',
        order: 2
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
        order: 1
    }
];

const tree = arr2tree(array);

const comparedTree = [{
    "id": 4,
    "name": "水果",
    "order": 1,
    "children": []
}, {
    "id": 1,
    "name": "蔬菜",
    "order": 2,
    "children": [{
            "id": 3,
            "name": "豆角",
            "pid": 1,
            "order": 1,
            "children": []
        },
        {
            "id": 2,
            "name": "土豆",
            "pid": 1,
            "order": 2,
            "children": []
        }
    ]
}];

if (!isEqual(comparedTree, tree)) {
    console.log(JSON.stringify(tree, null, 4));
    throw '😿  测试不通过!';
} else {
    console.log('🚀  通过测试!')
}