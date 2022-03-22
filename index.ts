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
    KEY_CHILDREN: 'children',
    transform: (node: Node): Node | void => node,
    isRoot: (node: Node) => !node[DEFAULT_OPTIONS.KEY_PID]
}

export default function (array: Node[], options?: Partial<typeof DEFAULT_OPTIONS>) {
    // 默认值
    const { KEY_ID, KEY_ORDER, KEY_CHILDREN, KEY_PID, transform, isRoot } = { ...DEFAULT_OPTIONS, ...options };

    const tree = [];
    let pidAndChildrenMap: Record<string, Node[]> | null = {};

    for (const node of array) {
        const { [KEY_ID]: id, [KEY_PID]: pid } = node;
        const currentNode = transform(node);
        if (void 0 === currentNode) continue;

        if (isRoot(node)) {
            // 根节点
            if (void 0 !== currentNode) {
                tree.push(currentNode);
            }
        } else {
            // 非根节点
            if (void 0 === pidAndChildrenMap[pid]) {
                pidAndChildrenMap[pid] = []
            }

            // if (void 0 !== currentNode) {
            pidAndChildrenMap[pid].push(currentNode);
            // }
        }

        // 用每个节点的id做map
        if (void 0 === pidAndChildrenMap[id]) {
            pidAndChildrenMap[id] = [];
        }

        // 让每个节点的children指向pidChildrenMap中的值
        currentNode[KEY_CHILDREN] = pidAndChildrenMap[id];
    }

    // 删除空的children字段
    for (const node of array) {
        if (0 === node.children.length) {
            delete node[KEY_CHILDREN]
        }
    }

    // 排序
    for (const key in pidAndChildrenMap) {
        if (0 >= pidAndChildrenMap[key].length) continue;
        pidAndChildrenMap[key].sort((prev, current) => prev[KEY_ORDER] - current[KEY_ORDER]);
    }
    tree.sort((prev, current) => prev[KEY_ORDER] - current[KEY_ORDER]);


    // 有循环引用, 手动销毁
    pidAndChildrenMap = null;
    return tree;
};