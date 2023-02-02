import React, { useState, useEffect } from 'react';
import { Typography } from "@mui/material";
interface Props {
    place: string;
}

interface Weather {
    weather: string;
    humidity: number;
    wind: number;
    icon: string;
}

const WeatherData = ({ place }: Props) => {
    const [weatherData, setWeatherData] = useState<Weather | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            if (!place) {
                return;
            }

            const API_KEY = '472c6fee4852e3b5f29805372257c5f6';
            const API_URL = `http://api.openweathermap.org/data/2.5/weather?q=${place}&appid=${API_KEY}`;

            try {
                const response = await fetch(API_URL);
                const data = await response.json();

                setWeatherData({
                    weather: data.weather[0].main,
                    humidity: data.main.humidity,
                    wind: data.wind.speed,
                    icon: data.weather[0].icon,
                });
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [place]);


    if (!weatherData) {
        return <div>Loading weather data...</div>;
    }

    //mui
    return (
        <div>
            <Typography variant="h6">The weather in {place} is {weatherData.weather}.</Typography>
            <Typography variant="h6">Humidity: {weatherData.humidity}%</Typography>
            <Typography variant="h6">Wind: {weatherData.wind} m/s</Typography>
            <img src={`http://openweathermap.org/img/w/${weatherData.icon}.png`} alt="weather icon"/>
        </div>
    );
};

export default WeatherData;