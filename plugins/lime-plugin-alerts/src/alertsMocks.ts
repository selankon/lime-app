import { AlertList } from "plugins/lime-plugin-alerts/src/alertsTypes";

export const getAlerts = async () => twoAlerts;

const noAlerts: AlertList = [];
export const oneAlerts: AlertList = [{ id: "not1" }];
const twoAlerts: AlertList = [...oneAlerts, { id: "not2" }];
