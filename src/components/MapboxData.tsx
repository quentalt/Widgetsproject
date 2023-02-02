import * as React from 'react';
import Map, {Marker} from 'react-map-gl';

import 'mapbox-gl/dist/mapbox-gl.css';


const MAPBOX_TOKEN = 'pk.eyJ1IjoicXVlbnRhbHQiLCJhIjoiY2xkbjY1am53MGVyMDN2cWd6eGNyc3dxOCJ9.-SXTkFJYZ3VpRslzHRJh-A'; // Set your mapbox token here

export default function MapboxData() {
    return (
        <div>
            <Map
                initialViewState={{
                    latitude: 37.8,
                    longitude: -122.4,
                    zoom: 14
                }}
                style={{width: 800, height: 300}}
                mapStyle="mapbox://styles/mapbox/streets-v9"
                mapboxAccessToken={MAPBOX_TOKEN}
            >
                <Marker longitude={-122.4} latitude={37.8} color="red" />
            </Map>
        </div>
    );
}