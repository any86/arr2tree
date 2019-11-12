# arr2tree [![NPM Version][npm-image]][npm-url] 

[npm-image]: https://badgen.net/npm/v/arr2tree
[npm-url]: https://npmjs.org/package/arr2tree

🌲 数组转树

## 安装
```shell
npm i -S arr2tree
```

## 快速开始
```javascript
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

// 🚀 开始转换
arr2tree(array);

// 🌲 输出:
// 
// [
//     {
//         "id": 1,
//         "name": "蔬菜",
//         "order": 1,
//         "children": [
//             {
//                 "id": 3,
//                 "name": "豆角",
//                 "pid": 1,
//                 "order": 1
//             },
//             {
//                 "id": 2,
//                 "name": "土豆",
//                 "pid": 1,
//                 "order": 2
//             }
//         ]
//     },
//     {
//         "id": 4,
//         "name": "水果",
//         "order": 2
//     }
// ]

```

## 兼容不同的键值
我们可以通过参数来兼容不同的业务下的键值:
```javascript
const arr = [{xxid:1, xxorder:1}, {xxid:2,xxpid:1,xxorder:2}];

arr2tree(arr, {
    KEY_ID: 'xxid',
    KEY_PID: 'xxpid',
    KEY_ORDER: 'xxorder'
});
```

## 每次循环的钩子
如果你需要获取每次循环的节点, 可以通过回调获取:
```javascript
const arr = [{xxid:1, xxorder:1}, {xxid:2,xxpid:1,xxorder:2}];

arr2tree(arr, {
    KEY_ID: 'xxid',
    KEY_PID: 'xxpid',
    KEY_ORDER: 'xxorder'
}, (node, isRoot)=>{
    // code
});
```
