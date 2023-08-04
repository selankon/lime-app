import { useEffect } from "preact/hooks";

import {
    useAlerts,
    useReadAlerts,
} from "plugins/lime-plugin-alerts/src/alertsQueries";
import AlertCard from "plugins/lime-plugin-alerts/src/components/alertCard";

const AlertsPage = () => {
    const { setData: setReadAlerts, data: readAlerts } = useReadAlerts();
    const { data, isSuccess } = useAlerts({});

    useEffect(() => {
        if (isSuccess && data) {
            setReadAlerts(data);
        }
    }, [data]);

    return (
        <>
            {data?.map((data, k) => (
                <AlertCard key={k} data={data} />
            ))}
        </>
    );
};

export default AlertsPage;
