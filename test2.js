const arr2tree = require('./dist/index.js').default;
const array = [
    {
        "name": "首页",
        "path": "/",
        "id": "1",
        "icon": "icon-round_rank_fill",
        "order":1
    },
    {
        "name": "系统",
        "id": "2",
        "icon": "icon-round_light_fill",
        "order":2
    },
    {
        "name": "人员管理",
        "path": "/user",
        "id": "3",
        "pid": "2",
        "icon": "icon-round_friend_fill",
        "order":12
    },
    {
        "name": "角色管理",
        "path": "/role",
        "id": "7",
        "pid": "2",
        "icon": "icon-ticket_fill",
        "order":1
    },
    {
        "name": "菜单管理",
        "path": "/menu",
        "id": "5",
        "pid": "2",
        "icon": "icon-ticket_fill",
        "order":999
    }
]

const tree = arr2tree(array);
console.log(JSON.stringify(tree,null,4));