import { AlertList } from "plugins/lime-plugin-alerts/src/alertsTypes";

// Calculate the new notifications based on ID or any other property that makes sense
export const unreadCount = (data: AlertList, prevData: AlertList) =>
    data.filter(
        (notification) => !prevData.some((prev) => prev.id === notification.id)
    ).length;
