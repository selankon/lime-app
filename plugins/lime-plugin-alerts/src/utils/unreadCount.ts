import { NotificationList } from "plugins/lime-plugin-alerts/src/alertsTypes";

// Calculate the new notifications based on ID or any other property that makes sense
const unreadCount = (data: NotificationList, prevData: NotificationList) =>
    data.filter(
        (notification) => !prevData.some((prev) => prev.id === notification.id)
    ).length;
