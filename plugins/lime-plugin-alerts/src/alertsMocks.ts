import { AlertList } from "plugins/lime-plugin-alerts/src/alertsTypes";

export const getAlerts = async () => twoAlerts;

export const noAlerts: AlertList = [];
export const oneAlerts: AlertList = [{ id: "not1" }];
export const twoAlerts: AlertList = [...oneAlerts, { id: "not2" }];
