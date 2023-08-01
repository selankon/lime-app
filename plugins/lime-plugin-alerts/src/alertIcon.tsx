import { useEffect, useState } from "preact/hooks";

import Badge from "components/badge";
import { Bell } from "components/icons/notification/bell";

import { oneAlerts } from "plugins/lime-plugin-alerts/src/alertsMocks";
import { useAlerts } from "plugins/lime-plugin-alerts/src/alertsQueries";

import { ALERTS_REFETCH_INTERVAL } from "utils/constants";

const AlertIcon = () => {
    const { data } = useAlerts({
        refetchInterval: ALERTS_REFETCH_INTERVAL,
        initialData: oneAlerts,
    });
    const [count, setCount] = useState(0);

    useEffect(() => {}, [data]);

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
