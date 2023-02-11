import React, { useState, useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import iconMarker from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import L from "leaflet";
import {Button, Input} from "@mui/material";

const MapboxData: React.FC = () => {
    const [address, setAddress] = useState("");
    const [location, setLocation] = useState<any>({});
    const [center, setCenter] = useState<[number, number]>([0, 0]);

    useEffect(() => {
        if (location.features && location.features.length > 0) {
            const [lng, lat] = location.features[0].geometry.coordinates;
            setCenter([lat, lng]);
        }
    }, [location]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const response = await fetch(
            `https://api.geoapify.com/v1/geocode/search?text=${address}&limit=1&apiKey={${process.env.REACT_APP_GEOAPIFY_API_KEY}}`
        );
        const data = await response.json();
        setLocation(data);
    };

    let iconUrl = L.icon({
        iconUrl: iconMarker,
        shadowUrl: iconShadow,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
    });
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Input
                    type="text"
                    placeholder="Enter address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />
                <Button type="submit">Get Location</Button>
            </form>
            {location.features && location.features.length > 0 && (
                <MapContainer center={center} zoom={9}
                style={{ height: "400px", width: "600px" }}>

                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <Marker position={center} icon={iconUrl}>
                        <Popup>
                            {location.features[0].properties.formatted}
                        </Popup>
                    </Marker>

                </MapContainer>
            )}
        </div>
    );
};

export default MapboxData;

