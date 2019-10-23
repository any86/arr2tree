/**
 * 数组转树
 * @param {Array} 输入
 * @param {Object.String} keyMap.KEY_ID 表示唯一性键值(id)
 * @param {Object.String} keyMap.KEY_PID 对应的父id
 * @param {Object.String} keyMap.KEY_ORDER 排序依据的键值
 * @returns {Object} 树结构
 */
module.exports = function(list, keyMap = {
    KEY_ID: 'MENU_CODE',
    KEY_PID: 'PARENT_CODE',
    KEY_ORDER: 'MENU_ORDER',
}) {
    const {
        KEY_ID,
        KEY_PID,
        KEY_ORDER
    } = keyMap;
    const roots = [];
    // 当前非根节点
    let childrenNode = [];

    // 分组根和非根节点
    list.forEach((item) => {
        if (undefined === item[KEY_PID]) {
            roots.push(item);
        } else {
            childrenNode.push(item);
        }
    });

    // 遍历根节点
    for (const root of roots) {
        findChild(root);
    }

    // 递归单个根节点
    function findChild(root) {
        if (0 >= childrenNode.length) return;
        let newChildNode = [];
        // root.children = [];
        childrenNode.forEach((child) => {
            if (root[KEY_ID] === child[KEY_PID]) {
                if (undefined === root.children) root.children = [];
                root.children.push(child);
                findChild(child /**new root */ );
            } else {
                newChildNode.push(child);
            }
        });

        // 排序
        if (undefined !== KEY_ORDER && root.children && 1 < root.children.length) {
            root.children = root.children.sort((prev, current) => prev[KEY_ORDER] - current[KEY_ORDER]);
        }
        childrenNode = newChildNode;
    }
    return roots;
}