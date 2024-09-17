import { Trans } from "@lingui/macro";
import { VNode } from "preact";
import { useCallback } from "react";

import { useModal } from "components/Modal/Modal";

import { useMeshWideUpgradeInfo } from "plugins/lime-plugin-mesh-wide-upgrade/src/meshUpgradeQueries";
import { MeshWideUpgradeInfo } from "plugins/lime-plugin-mesh-wide-upgrade/src/meshUpgradeTypes";
import {
    ConditionFun,
    abortCondition,
    confirmCondition,
    getNodesByCondition,
    scheduleCondition,
} from "plugins/lime-plugin-mesh-wide-upgrade/src/utils/api";

interface IUseParallelQueriesModalProps {
    useSuccessBtn?: boolean;
    cb?: (e) => void;
    title?: VNode;
    content?: VNode;
    btnTxt?: VNode;
    condition: ConditionFun;
}

const useParallelQueriesModal = ({
    useSuccessBtn,
    cb,
    title,
    content,
    btnTxt = <Trans>Schedule</Trans>,
    condition,
}: IUseParallelQueriesModalProps) => {
    const { toggleModal, setModalState } = useModal();
    const runAndClose = useCallback(() => {
        cb(null);
        toggleModal();
    }, [cb, toggleModal]);
    const { data: nodes } = useMeshWideUpgradeInfo({});
    const targets = getNodesByCondition(nodes, condition);

    let _content = (
        <div className={"flex flex-col gap-4"}>
            {content}
            <TargetNodes targets={targets.map(([nodeName]) => nodeName)} />
        </div>
    );
    if (targets.length === 0) {
        _content = (
            <div className={"flex flex-col gap-4"}>
                <Trans>
                    There are no compatible nodes for this action on the shared
                    state. Await until shared state is updated to perform this
                    operation
                </Trans>
            </div>
        );
    }

    const showModal = useCallback(() => {
        if (targets.length === 0) {
            setModalState({
                content: _content,
                title,
                cancelBtn: true,
            });
        } else {
            setModalState({
                content: _content,
                title,
                successCb: useSuccessBtn ? runAndClose : undefined,
                deleteCb: !useSuccessBtn ? runAndClose : undefined,
                successBtnText: btnTxt,
                deleteBtnText: btnTxt,
            });
        }
        toggleModal();
    }, [
        targets.length,
        setModalState,
        _content,
        title,
        useSuccessBtn,
        runAndClose,
        btnTxt,
        toggleModal,
    ]);

    return { showModal, toggleModal };
};

export const useScheduleUpgradeModal = ({
    useSuccessBtn,
    cb,
}: IUseParallelQueriesModalProps) => {
    let title = <Trans>All nodes are ready</Trans>;
    let content = (
        <Trans>Schedule a firmware upgrade for all nodes on the network</Trans>
    );
    if (!useSuccessBtn) {
        title = <Trans>Some nodes are not ready</Trans>;
        content = (
            <Trans>
                Are you sure you want to start mesh wide upgrade? <br />
                Check node list to see the network status
            </Trans>
        );
    }

    return useParallelQueriesModal({
        useSuccessBtn,
        cb,
        title,
        content,
        condition: scheduleCondition,
    });
};

export const useConfirmModal = ({
    useSuccessBtn,
    cb,
}: IUseParallelQueriesModalProps) => {
    let title = <Trans>All nodes are upgraded successfully</Trans>;
    let content = (
        <Trans>Confirm mesh wide upgrade for all nodes on the network</Trans>
    );
    if (!useSuccessBtn) {
        title = <Trans>Some nodes don't upgraded properly</Trans>;
        content = (
            <Trans>
                Are you sure you want to confirm the upgrade? <br />
                Check node list to see the network status
            </Trans>
        );
    }

    return useParallelQueriesModal({
        useSuccessBtn,
        cb,
        title,
        content,
        btnTxt: <Trans>Confirm</Trans>,
        condition: confirmCondition,
    });
};

export const useAbortModal = ({ cb }: IUseParallelQueriesModalProps) => {
    const title = <Trans>Abort current mesh wide upgrade?</Trans>;
    const content = (
        <Trans>
            This will the abort current upgrade process on all nodes. Are you
            sure you want to proceed?
        </Trans>
    );
    const btnTxt = <Trans>Abort</Trans>;
    return useParallelQueriesModal({
        useSuccessBtn: false,
        cb,
        title,
        content,
        btnTxt,
        condition: abortCondition,
    });
};

const TargetNodes = ({ targets }: { targets: string[] }) => {
    return (
        <div>
            <Trans>
                If a node don't appear here check network state to ensure node
                is ready for this operation. Network state needs a time to be
                updated
            </Trans>
            <div>{targets.join(", ")}</div>
        </div>
    );
};
