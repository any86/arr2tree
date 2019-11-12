/**
 * 数组转树
 * @param {Array} 输入
 * @param {Object.String} keyMap.KEY_ID 表示唯一性键值(id)
 * @param {Object.String} keyMap.KEY_PID 对应的父id
 * @param {Object.String} keyMap.KEY_ORDER 排序依据的键值
 * @param {Function} 每次循环执行, 返回"节点"和"是否根节点"
 * @returns {Object} 树结构
 */
module.exports = function(array, keyMap = {
    KEY_ID: 'id',
    KEY_PID: 'pid',
    KEY_ORDER: 'order'
}, callback = () => {}) {
    const {
        KEY_ID,
        KEY_PID,
        KEY_ORDER
    } = keyMap;

    const tree = [];
    let nodeMap = {};

    for (const node of array) {
        const id = node[KEY_ID];
        const pid = node[KEY_PID];

        if (pid) {
            // 非根节点
            nodeMap[pid] = nodeMap[pid] || [];
            nodeMap[pid].push(node);
            callback(node, false);
        } else {
            // 根节点
            tree.push(node);
            callback(node, true);
        }

        if (undefined === nodeMap[id]) {
            nodeMap[id] = [];
        }



        node.children = nodeMap[id];
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