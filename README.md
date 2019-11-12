# arr2tree
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