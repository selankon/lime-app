import { route } from "preact-router";
import { useEffect, useState } from "preact/hooks";

import Badge from "components/badge";
import { Bell } from "components/icons/notification/bell";

import {
    useAlerts,
    useReadAlerts,
} from "plugins/lime-plugin-alerts/src/alertsQueries";
import { unreadCount } from "plugins/lime-plugin-alerts/src/utils/unreadCount";

import { ALERTS_REFETCH_INTERVAL } from "utils/constants";

const AlertIcon = () => {
    // const [oldData, setOldData] = useState<AlertList>(null);
    const { data, isSuccess } = useAlerts({
        refetchInterval: ALERTS_REFETCH_INTERVAL,
        // placeholderData: oneAlerts,
    });
    const [count, setUnreadCount] = useState<number>();
    // const { data: readAlerts } = useReadAlerts();
    const { data: readAlerts } = useReadAlerts();

    useEffect(() => {
        if (isSuccess && data) {
            if (!readAlerts && data?.length > 0) {
                setUnreadCount(data.length);
            } else {
                setUnreadCount(unreadCount(data, readAlerts));
            }
        }
    }, [data, isSuccess, readAlerts]);

    return (
        <div onClick={() => route("/alerts")}>
            {data?.length ? (
                <div>
                    {count > 0 ? (
                        <Badge>
                            <Bell />
                        </Badge>
                    ) : (
                        <Bell />
                    )}
                </div>
            ) : (
                <></>
            )}
        </div>
    );
};

export default AlertIcon;
