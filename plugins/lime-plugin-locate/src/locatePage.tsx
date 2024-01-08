import "leaflet/dist/leaflet.css";
import "leaflet/dist/leaflet.js";

import { LocateMap } from "plugins/lime-plugin-locate/src/locateMap";

export const LocatePage = () => {
    return <LocateMap />;
};

export default LocatePage;
