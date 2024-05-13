import {
    BaseMacToMacLink,
    Coordinates,
    ILocatedLink,
    INodeInfo,
    LinkDataTypes,
    LinkType,
    MacToMacLinkId,
    PointToPointLinkId,
} from "plugins/lime-plugin-mesh-wide/src/meshWideTypes";

/**
 * This class should store a group of links between the same geo coordinates.
 *
 * Could store two links between same geo but with different macs
 */
export class PontToPointLink {
    private _links: BaseMacToMacLink[] = [];
    private _nodes: INodeInfo[] = [];
    public readonly id: PointToPointLinkId;
    public readonly coordinates: Coordinates[] = [];

    constructor(node1: INodeInfo, node2: INodeInfo) {
        const coord1 = node1.coordinates;
        const coord2 = node2.coordinates;
        this.id = PontToPointLink.generateId(coord1, coord2);
        this.nodes.push(node1, node2);
        this.coordinates.push(coord1, coord2);
    }

    addLink(link: typeof this._links[number]) {
        this.links.push(link);
    }

    /**
     * For a given two macs check if any of the links on the _links array contain a node with this macs. (which should
     * mean that the link is already added on the array).
     * @param mac1
     * @param mac2
     */
    linkExists(linkKey: string) {
        const link = this._links.find((link) => link.id === linkKey);
        return !!link;
    }

    get links() {
        return this._links;
    }

    get nodes() {
        return this._nodes;
    }

    /**
     * Generate a deterministic unique id based on the coordinates of a node.
     * @param coord1
     * @param coord2
     */
    static generateId(coord1: Coordinates, coord2: Coordinates): string {
        const _prepareCoord = (coord: string) =>
            parseFloat(coord.replace("-", "").replace(".", ""));

        const allCoordinates = [
            _prepareCoord(coord1.long),
            _prepareCoord(coord1.lat),
            _prepareCoord(coord2.long),
            _prepareCoord(coord2.lat),
        ];

        return allCoordinates.sort((a, b) => a - b).toString();
    }

    get type(): LinkType {
        return this._links[0].type;
    }
}

/**
 * Store link info between two macs
 */
export class MacToMacLink<T extends LinkType> {
    private _data: ILocatedLink<T>;
    private _id: MacToMacLinkId;
    public type: T;

    constructor(id: MacToMacLinkId, data: ILocatedLink<T>, type: T) {
        this._data = data;
        this._id = id;
        this.type = type;
    }

    get id() {
        return this._id;
    }

    get data() {
        return this._data;
    }

    get names(): string[] {
        return [...Object.keys(this._data)];
    }

    linkByName(name: string): LinkDataTypes[T] {
        return this._data[name];
    }
}
