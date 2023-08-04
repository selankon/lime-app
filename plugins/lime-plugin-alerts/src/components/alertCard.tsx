import Alert from "components/alert/alert";

import { Alert as AlertModel } from "plugins/lime-plugin-alerts/src/alertsTypes";

const AlertCard = ({ data }: { data: AlertModel }) => {
    return (
        <Alert title={data.id} right={data.timestamp}>
            Alert description
        </Alert>
    );
};

export default AlertCard;
