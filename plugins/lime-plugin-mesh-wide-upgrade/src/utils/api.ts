import {
    MeshWideUpgradeInfo,
    NodeMeshUpgradeInfo,
} from "plugins/lime-plugin-mesh-wide-upgrade/src/meshUpgradeTypes";

export type ConditionFun = (node: NodeMeshUpgradeInfo) => boolean;

/**
 * From a MeshWideUpgradeInfo nodes it returns the ips of the nodes that match the condition defined on the function
 * @param nodes the nodes to check
 * @param condition function that receives a NodeMeshUpgradeInfo and returns a boolean
 */
export const getNodeIpsByCondition = (
    nodes: MeshWideUpgradeInfo,
    condition: ConditionFun
) => {
    return getNodesByCondition(nodes, condition).map(
        ([, node]) => node.node_ip as string // 'as string' is safe here due to the filter condition
    );
};

export const getNodesByCondition = (
    nodes: MeshWideUpgradeInfo,
    condition: ConditionFun
) => {
    if (!nodes) return [];
    return Object.entries(nodes).filter(
        ([, node]) =>
            node.node_ip !== null &&
            node.node_ip !== undefined &&
            node.node_ip.trim() !== "" &&
            condition(node)
    );
};

export const abortCondition: ConditionFun = (node) =>
    [
        "READY_FOR_UPGRADE",
        "UPGRADE_SCHEDULED",
        "CONFIRMATION_PENDING",
        "ERROR",
    ].includes(node.upgrade_state);

export const confirmCondition: ConditionFun = (node) =>
    node.upgrade_state === "CONFIRMATION_PENDING";

export const scheduleCondition: ConditionFun = (node) =>
    node.upgrade_state === "READY_FOR_UPGRADE";
