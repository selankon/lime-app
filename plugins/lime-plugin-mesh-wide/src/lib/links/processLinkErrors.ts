import { PontToPointLink } from "plugins/lime-plugin-mesh-wide/src/lib/links/PointToPointLink";
import {
    BabelLinkErrorCodes,
    BatmanLinkErrorCodes,
    IBabelLinkData,
    IBatManLinkData,
    ILinkPtoPErrors,
    IWifiLinkData,
    LinksErrorCodesTypes,
    WifiLinkErrorCodes,
} from "plugins/lime-plugin-mesh-wide/src/meshWideTypes";

import { DEFAULT_COMMUNITY_SETTINGS } from "utils/constants";

/**
 * It compares two links and return an array of error codes.
 * @param reference
 * @param actual
 */
const compareWifiData = (reference: IWifiLinkData, actual: IWifiLinkData) => {
    // todo(kon): use community settings and not limeapp defaults
    // const { data: communitySettings } = useCommunitySettings();

    const errors: WifiLinkErrorCodes[] = [];
    if (actual === undefined || actual.signal === undefined) {
        return [WifiLinkErrorCodes.LINK_DOWN];
    }

    if (
        reference.signal - actual.signal >
        DEFAULT_COMMUNITY_SETTINGS.mw_link_signal_threshold
    ) {
        errors.push(WifiLinkErrorCodes.SIGNAL_LOSS);
    }
    if (
        Math.abs(actual.chains[0] - actual.chains[1]) >
        DEFAULT_COMMUNITY_SETTINGS.mw_link_chain_threshold
    ) {
        errors.push(WifiLinkErrorCodes.CHAIN_LOSS);
    }
    return errors;
};

const compareBatmanData = (
    reference: IBatManLinkData,
    actual: IBatManLinkData
) => {
    const errors: BatmanLinkErrorCodes[] = [];
    if (actual === undefined) {
        return [BatmanLinkErrorCodes.LINK_DOWN];
    }
    return errors;
};

const compareBabelData = (
    reference: IBabelLinkData,
    actual: IBabelLinkData
) => {
    const errors: BabelLinkErrorCodes[] = [];
    if (actual === undefined) {
        return [BabelLinkErrorCodes.LINK_DOWN];
    }
    return errors;
};

/**
 * Function that receive 2 PontToPointLink and iterate over every mac to mac link and its data executing a function
 * to compare the wifi data.
 * @param referenceLink
 * @param actualLink
 */
export const compareLinks = ({
    referenceLink,
    actualLink,
}: {
    referenceLink: PontToPointLink;
    actualLink: PontToPointLink | undefined;
}) => {
    if (!referenceLink) return;

    const ptoPErrors: ILinkPtoPErrors = {
        macToMacErrors: {},
        hasErrors: false,
        linkUp: true,
    };

    let downCounter = 0;

    referenceLink.links.forEach((macToMacReference) => {
        const setLinkIsDown = () => {
            ptoPErrors.linkUp = false;
        };

        const macToMacActual = actualLink?.links.find(
            (actual) => actual.id === macToMacReference.id
        );

        const isUp = !!actualLink;
        if (!isUp) setLinkIsDown();

        if (!ptoPErrors.macToMacErrors[macToMacReference.id]) {
            ptoPErrors.macToMacErrors[macToMacReference.id] = {
                hasErrors: false,
                linkErrors: {},
                linkUp: isUp,
            };
        }
        Object.entries(macToMacReference.data).forEach(
            ([nodeNameReference, wifiDataReference]) => {
                const wifiDataActual = macToMacActual?.data[nodeNameReference];
                let errors: LinksErrorCodesTypes[] = [];
                switch (referenceLink.type) {
                    case "wifi_links_info":
                        errors = compareWifiData(
                            wifiDataReference as IWifiLinkData,
                            wifiDataActual as IWifiLinkData
                        );
                        break;
                    case "bat_links_info":
                        errors = compareBatmanData(
                            wifiDataReference as IBatManLinkData,
                            wifiDataActual as IBatManLinkData
                        );
                        break;
                    case "babel_links_info":
                        errors = compareBabelData(
                            wifiDataReference as IBabelLinkData,
                            wifiDataActual as IBabelLinkData
                        );
                        break;
                }
                ptoPErrors.macToMacErrors[macToMacReference.id].linkErrors[
                    nodeNameReference
                ] = errors;
                if (errors.length) {
                    ptoPErrors.macToMacErrors[macToMacReference.id].hasErrors =
                        true;
                    ptoPErrors.hasErrors = true;

                    if (errors.includes(WifiLinkErrorCodes.LINK_DOWN)) {
                        ptoPErrors.macToMacErrors[macToMacReference.id].linkUp =
                            false;
                        downCounter++;
                    }
                }
            }
        );
    });
    if (downCounter === referenceLink.links.length) {
        ptoPErrors.linkUp = false;
    }
    return ptoPErrors;
};
