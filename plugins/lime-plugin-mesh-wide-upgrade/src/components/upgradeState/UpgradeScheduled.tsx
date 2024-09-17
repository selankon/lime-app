import { Trans } from "@lingui/macro";

import {
    ParallelErrors,
    UpgradeState,
} from "plugins/lime-plugin-mesh-wide-upgrade/src/components/upgradeState/UpgradeState";
import { useMeshUpgrade } from "plugins/lime-plugin-mesh-wide-upgrade/src/hooks/meshWideUpgradeProvider";
import { useParallelScheduleUpgrade } from "plugins/lime-plugin-mesh-wide-upgrade/src/meshUpgradeQueries";

export const UpgradeScheduled = () => {
    const { totalNodes } = useMeshUpgrade();
    const { errors, results } = useParallelScheduleUpgrade();
    const nodesToBeUpgraded = results?.length;
    const { thisNode } = useMeshUpgrade();

    return (
        <UpgradeState title={<Trans>Upgrade is scheduled!</Trans>}>
            <>
                <Trans>
                    {nodesToBeUpgraded} of {totalNodes} will be upgraded
                </Trans>
                {thisNode?.safeupgrade_start_remaining && (
                    <div>
                        <Trans>
                            Node will upgrade in
                            {thisNode?.safeupgrade_start_remaining} seconds
                        </Trans>
                    </div>
                )}
                {errors?.length > 0 && <ParallelErrors errors={errors} />}
            </>
        </UpgradeState>
    );
};
