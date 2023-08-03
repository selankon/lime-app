import { useEffect } from "preact/hooks";

import {
    useAlerts,
    useReadAlerts,
} from "plugins/lime-plugin-alerts/src/alertsQueries";

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
                <div key={k}>{data.id}</div>
            ))}
        </>
    );
};

export default AlertsPage;
