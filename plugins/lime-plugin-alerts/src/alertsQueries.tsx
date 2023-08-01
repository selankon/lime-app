import { useQuery } from "@tanstack/react-query";

import { getAlerts } from "plugins/lime-plugin-alerts/src/alertsMocks";

export function useAlerts(params) {
    return useQuery(["lime-notifications", "get_notifications"], getAlerts, {
        ...params,
    });
}
