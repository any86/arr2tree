type Node = Record<string | number, any>;
/**
 * 数组转树
 * @param 输入数组
 * @param options.KEY_ID 表示唯一性键值(id)
 * @param options.KEY_PID 对应的父id
 * @param options.KEY_ORDER 排序依据的键值
 * @param options.isRoot 判断是否根节点, 接收一个参数(当前循环的节点)
 * @param options.transform 控制节点的返回格式
 * @returns 树结构
 */
//  (node:Node)=>boolean
const DEFAULT_OPTIONS = {
    KEY_ID: 'id',
    KEY_PID: 'pid',
    KEY_ORDER: 'order',
    transform: (node: Node): Node | void => node,
    isRoot: (node: Node) => void 0 === node[DEFAULT_OPTIONS.KEY_PID]
}



export = function (array: Node[], options?: typeof DEFAULT_OPTIONS) {
    // 默认值
    const { KEY_ID, KEY_ORDER, KEY_PID, transform, isRoot } = { ...DEFAULT_OPTIONS, ...options };

    const tree = [];
    let nodeMap: Record<string, Node[]> | null = {};

    for (const node of array) {
        const id = node[KEY_ID];
        const pid = node[KEY_PID];

        let _node;
        if (isRoot(node)) {
            // 根节点
            _node = transform(node);
            if (void 0 === _node) continue;
            _node.children = node.children;
            if (void 0 !== _node) {
                tree.push(_node);
            }
        } else {
            // 非根节点
            _node = transform(node);
            if (void 0 === _node) continue;
            _node.children = node.children;
            nodeMap[pid] = nodeMap[pid] || [];
            if (void 0 !== _node) {
                nodeMap[pid].push(_node);
            }
        }

        if (undefined === nodeMap[id]) {
            nodeMap[id] = [];
        }

        _node.children = nodeMap[id];
    }
    // 排序
    for (const key in nodeMap) {
        if (0 >= nodeMap[key].length) continue;
        nodeMap[key].sort((prev, current) => prev[KEY_ORDER] - current[KEY_ORDER]);
    }

    tree.sort((prev, current) => prev[KEY_ORDER] - current[KEY_ORDER]);

    // 有循环引用, 手动销毁
    nodeMap = null;
    return tree;
};