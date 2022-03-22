export type Node = Record<string | number, any>;

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
    isRoot: (node: Node) => void 0 !== node[DEFAULT_OPTIONS.KEY_PID]
}

export default function (array: Node[], options?: Partial<typeof DEFAULT_OPTIONS>) {
    // 默认值
    const { KEY_ID, KEY_ORDER, KEY_PID, KEY_CHILDREN, transform, isRoot } = { ...DEFAULT_OPTIONS, ...options };

    // 目标结果
    const tree = [];
    // pid -> childNode 映射
    let childNodeMap: Record<string | number, Node[]> | null = {};
    // 遍历
    for (const node of array) {
        const { [KEY_ID]: id, [KEY_PID]: pid } = node;
        // 指针
        const currentNode = transform(node);
        if (void 0 === currentNode) continue;

        // currentNode[KEY_CHILDREN] = node[KEY_CHILDREN];

        if (isRoot(node)) {
            // 根节点
            tree.push(currentNode);
        } else {
            // 非根节点
            if (void 0 === childNodeMap[pid]) {
                childNodeMap[pid] = [];
            }
            childNodeMap[pid].push(currentNode);
        }

        if (void 0 === childNodeMap[id]) {
            childNodeMap[id] = [];
        }
        currentNode[KEY_CHILDREN] = childNodeMap[id];
    }

    // 删除值为空的children字段
    for (const index in array) {
        if (0 === array[index].children.length) {
            delete array[index].children
        }
    }

    // 排序
    if (void 0 !== tree[0][KEY_ORDER]) {
        for (const pid in childNodeMap) {
            if (0 >= childNodeMap[pid].length) continue;
            childNodeMap[pid].sort((prev, current) => prev[KEY_ORDER] - current[KEY_ORDER]);
        }
        tree.sort((prev, current) => prev[KEY_ORDER] - current[KEY_ORDER]);
    }

    // 有循环引用, 手动销毁
    childNodeMap = null;
    return tree;
};