import {
    MacToMacLink,
    PontToPointLink,
} from "plugins/lime-plugin-mesh-wide/src/lib/links/PointToPointLink";
import {
    ILinks,
    ILocatedLink,
    INodes,
    LinkData,
    LinkType,
    LocatedLinkData,
} from "plugins/lime-plugin-mesh-wide/src/mesWideTypes";

export const mergeLinksAndCoordinates = <T extends LinkType>(
    nodes: INodes,
    links: ILinks<T>,
    type: T
): LocatedLinkData => {
    if (!nodes || !links) return {};
    const result: LocatedLinkData = {};

    // for every node check all links
    for (const linkNodeName in links) {
        for (const linkData of links[linkNodeName].data) {
            // Get the nodeName of the destination node
            const dstNodeName = Object.keys(nodes).find((pid) => {
                return nodes[pid].data.macs.find(
                    (mac) =>
                        mac.toLowerCase() === linkData.dst_mac.toLowerCase()
                );
            });

            if (
                dstNodeName &&
                dstNodeName !== linkNodeName &&
                nodes[linkNodeName] // If is the link for a non geolocated node
            ) {
                // Generate a unique id of the point to point link based on the coordinates
                const linkKey = PontToPointLink.generateId(
                    nodes[linkNodeName].data.coordinates,
                    nodes[dstNodeName!].data.coordinates
                );

                // If this point to point link no exists, instantiate it
                if (!result[linkKey]) {
                    result[linkKey] = new PontToPointLink(
                        nodes[linkNodeName].data.coordinates,
                        nodes[dstNodeName!].data.coordinates
                    );
                }
                // Else if the link is not already added don't do it.
                else if (
                    result[linkKey].linkExists(
                        linkData.src_mac,
                        linkData.dst_mac
                    ) ||
                    !links[dstNodeName]
                ) {
                    continue;
                }

                // Get the destination link info
                const destPointData = (
                    links[dstNodeName].data as Array<LinkData[T]>
                ).find(
                    (data: LinkData[T]) =>
                        data.dst_mac.toLowerCase() ===
                            linkData.src_mac.toLowerCase() &&
                        data.src_mac.toLowerCase() ===
                            linkData.dst_mac.toLowerCase()
                );

                const entry = {
                    [linkNodeName]: {
                        ...linkData,
                        coordinates: nodes[linkNodeName].data.coordinates,
                    },
                    [dstNodeName]: {
                        ...destPointData,
                        coordinates: nodes[dstNodeName].data.coordinates,
                    },
                } as ILocatedLink<T>;

                result[linkKey].addLink(new MacToMacLink(entry, type));
            }
        }
    }

    return result;
};
