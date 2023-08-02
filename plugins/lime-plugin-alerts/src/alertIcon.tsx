import { useEffect, useState } from "preact/hooks";

import Badge from "components/badge";
import { Bell } from "components/icons/notification/bell";

import { oneAlerts } from "plugins/lime-plugin-alerts/src/alertsMocks";
import {
    useAlerts,
    useUnreadCount,
} from "plugins/lime-plugin-alerts/src/alertsQueries";
import { AlertList } from "plugins/lime-plugin-alerts/src/alertsTypes";
import { unreadCount } from "plugins/lime-plugin-alerts/src/utils/unreadCount";

import { ALERTS_REFETCH_INTERVAL } from "utils/constants";

const AlertIcon = () => {
    const [oldData, setOldData] = useState<AlertList>(null);
    const { data, isSuccess } = useAlerts({
        refetchInterval: ALERTS_REFETCH_INTERVAL,
        placeholderData: oneAlerts,
    });
    const { mutate: setUnreadCount, data: count } = useUnreadCount();

    useEffect(() => {
        if (isSuccess && data) {
            if (oldData) {
                const unread = unreadCount(data, oldData);
                if (unread) setUnreadCount(unread);
            }
            setOldData(data);
        }
        // eslint-disable-next-line
    }, [data]);

    return (
        <>
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
        </>
    );
};

export default AlertIcon;
