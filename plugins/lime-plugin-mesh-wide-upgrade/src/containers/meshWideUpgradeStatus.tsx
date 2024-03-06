import { Trans } from "@lingui/macro";

import { ErrorState } from "plugins/lime-plugin-mesh-wide-upgrade/src/components/upgradeState/ErrorState";
import { LoadingPage } from "plugins/lime-plugin-mesh-wide-upgrade/src/components/upgradeState/LoadingPage";
import { NewVersionAvailable } from "plugins/lime-plugin-mesh-wide-upgrade/src/components/upgradeState/NewVersionAvailable";
import { NoNewVersionAvailable } from "plugins/lime-plugin-mesh-wide-upgrade/src/components/upgradeState/NoNewVersion";
import { TransactionStarted } from "plugins/lime-plugin-mesh-wide-upgrade/src/components/upgradeState/TransactionStarted";
import { UpgradeScheduled } from "plugins/lime-plugin-mesh-wide-upgrade/src/components/upgradeState/UpgradeScheduled";
import { useMeshUpgrade } from "plugins/lime-plugin-mesh-wide-upgrade/src/hooks/meshWideUpgradeProvider";
import { CenterFlex } from "plugins/lime-plugin-mesh-wide-upgrade/src/utils/divs";

const MeshWideUpgradeStatusState = () => {
    const { stepperState, meshWideError } = useMeshUpgrade();

    if (stepperState === "ERROR") {
        return <ErrorState msg={meshWideError?.errorMessage} />;
    } else if (stepperState === "UPDATE_AVAILABLE") {
        return <NewVersionAvailable />;
    } else if (stepperState === "DOWNLOADING_MAIN") {
        return <LoadingPage title={<Trans>Downloading</Trans>} />;
    } else if (stepperState === "DOWNLOADED_MAIN") {
        return <NewVersionAvailable readyForUpgrade />;
    } else if (
        stepperState === "TRANSACTION_STARTED" ||
        stepperState === "NODES_DOWNLOADING"
    ) {
        return <TransactionStarted />;
    } else if (stepperState === "SENDING_START_SCHEDULE") {
        return (
            <LoadingPage
                title={<Trans>Scheduling upgrade</Trans>}
                description={
                    <Trans>Schedule upgrade to all available nodes</Trans>
                }
            />
        );
    } else if (stepperState === "UPGRADE_SCHEDULED") {
        return <UpgradeScheduled />;
    } else if (stepperState === "CONFIRMATION_PENDING") {
        return <>todo</>;
    } else if (stepperState === "CONFIRMED") {
        return <>todo</>;
    }
    return <NoNewVersionAvailable />;
};

export const MeshWideUpgradeStatus = () => {
    return (
        <CenterFlex>
            <MeshWideUpgradeStatusState />
        </CenterFlex>
    );
};
