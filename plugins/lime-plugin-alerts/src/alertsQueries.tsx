import { useQuery } from "@tanstack/react-query";

import { getAlerts } from "plugins/lime-plugin-alerts/src/alertsMocks";
import { AlertList } from "plugins/lime-plugin-alerts/src/alertsTypes";

import { useSharedData } from "utils/useSharedData";

export function useAlerts(params) {
    return useQuery(["lime-notifications", "get_notifications"], getAlerts, {
        ...params,
    });
}

export const useReadAlerts = () => {
    return useSharedData<AlertList>(["lime-notifications", "read_alerts"]);
};
