import { Trans } from "@lingui/macro";

import { Collapsible } from "components/collapsible";

import { FullScreenModal } from "containers/Modal/FullScreenModal";

import { StatusAndButton } from "plugins/lime-plugin-mesh-wide/src/components/Components";

const MeshWideConfigPage = () => {
    return (
        <>
            <FullScreenModal title={<Trans>Mesh wide config</Trans>}>
                <div>
                    {dropdowns.map((dropdown, index) => (
                        <Collapsible
                            key={index}
                            title={dropdown}
                            initCollapsed={true}
                        >
                            <div className="p-4">
                                <select className="border border-gray-300 p-2 rounded">
                                    <option value="">{dropdown}</option>
                                </select>
                            </div>
                        </Collapsible>
                    ))}
                </div>
                <div className="z-50 fixed bottom-0 w-full flex flex-col items-center bg-white px-10">
                    <div class="flex-grow border-t-2 border-gray-300 w-11/12" />
                    <StatusAndButton isError={false} btn={"Update"}>
                        <div className={"flex flex-col "}>
                            <Trans>10 of 12 node are ready to update</Trans>
                            <br />
                            <span className={"text-xl"}>
                                <Trans>Last update: 30 second ago</Trans>
                            </span>
                        </div>
                    </StatusAndButton>
                </div>
            </FullScreenModal>
        </>
    );
};

export default MeshWideConfigPage;

const dropdowns = [
    "Dropdown 1",
    "Dropdown 2",
    "Dropdown 3",
    "Dropdown 1",
    "Dropdown 2",
    "Dropdown 3",
    "Dropdown 1",
    "Dropdown 2",
    "Dropdown 3",
    "Dropdown 1",
    "Dropdown 2",
    "Dropdown 3",
    "Dropdown 1",
    "Dropdown 2",
    "Dropdown 3",
    "Dropdown 1",
    "Dropdown 2",
    "Dropdown 3",
    "Dropdown 1",
    "Dropdown 2",
    "Dropdown 3",
    "Dropdown 1",
    "Dropdown 2",
    "Dropdown 3",
];
