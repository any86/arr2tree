declare type Node = Record<string | number, any>;
declare const _default: (array: any[], { KEY_ID, KEY_PID, KEY_ORDER, assessRoot, transform }?: {
    KEY_ID?: string | undefined;
    KEY_PID?: string | undefined;
    KEY_ORDER?: string | undefined;
    assessRoot?: undefined;
    transform?: ((node: Node, isRoot: boolean) => any) | undefined;
}) => any[];
export = _default;
