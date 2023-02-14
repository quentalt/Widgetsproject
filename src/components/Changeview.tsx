import {useMap} from "react-leaflet";
import React from "react";

interface ChangeViewProps {
    center: [number, number];
    zoom: number;
}

const Changeview: React.FunctionComponent<ChangeViewProps> = ({ center, zoom }) => {
    const map = useMap();
    map.setView(center, zoom);
    return null;
}

export default Changeview;
