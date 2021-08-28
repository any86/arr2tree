# arr2tree [![NPM Version][npm-image]][npm-url] [![Node CI](https://github.com/any86/arr2tree/actions/workflows/nodejs.yml/badge.svg)](https://github.com/any86/arr2tree/actions/workflows/nodejs.yml)

[npm-image]: https://badgen.net/npm/v/arr2tree
[npm-url]: https://npmjs.org/package/arr2tree

🌲 数组转树

## 安装
```shell
npm i -S arr2tree
```

## 快速开始

```javascript
const tree = arr2tree(array);
```

### 数组(array)
```javascript
//  ======= 输入数组 🍔:=======
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
```


### 树(tree)
```javascript
//  ======= 输出 🌲:=======
[
    {
        "id": 1,
        "name": "蔬菜",
        "order": 1,
        "children": [
            {
                "id": 3,
                "name": "豆角",
                "pid": 1,
                "order": 1
            },
            {
                "id": 2,
                "name": "土豆",
                "pid": 1,
                "order": 2
            }
        ]
    },
    {
        "id": 4,
        "name": "水果",
        "order": 2
    }
]
```
## 进阶
### 兼容不同的键值
我们可以通过参数来兼容不同业务下的键值:
```javascript
const arr = [{xxid:1, xxorder:1}, {xxid:2,xxpid:1,xxorder:2}];

arr2tree(arr, {
    KEY_ID: 'xxid',
    KEY_PID: 'xxpid',
    KEY_ORDER: 'xxorder'
});
```

### 自定义返回节点结构

```javascript
const arr = [{xxid:1, xxorder:1}, {xxid:2,xxpid:1,xxorder:2}];
function transform(node) {
    // 如果返回undefined, 那么当前节点就不会出现在树中.
    return { key: node.id, pKey:node.pid};
}

arr2tree(arr, {
    KEY_ID: 'xxid',
    KEY_PID: 'xxpid',
    KEY_ORDER: 'xxorder',
    transform,
});

// 输出
// [{
//     key:1, 
//     children:[
//         {key:2, pKey:1}
//     ]
// }]
```

### 自定义根节点的判断条件
默认情况下**arr2tree**通过判断"节点上的**KEY_PID**对应的属性是否false"来区分根/子节点. 也就是值为空或者小于1的值都会当做父节点.

内部逻辑: 
```javascript
const isRoot =  (node) => !node[KEY_PID]
```

如果不满足也可通过自定义`isRoot`来设置判断函数:
```javascript
arr2tree(arr, {
    isRoot: node=> node.iAmRoot
});
```

