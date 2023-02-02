import React, { useState, useEffect } from 'react';
import {Card, CardContent, Typography} from "@mui/material";
interface Props {
    place: string;
}

interface Weather {
    weather: string;
    humidity: number;
    wind: number;
    icon: string;

    main: {
        temp: number;
    }
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
                    main: {
                        temp: data.main.temp - 273.15
                    }
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
        <Card sx={{ minWidth: 275 }}>
            <CardContent>
                <Typography variant="h5" component="div">
                    The weather in {place} is {weatherData.weather}
                </Typography>
                <Typography variant="body1" component="div">
                    Humidity: {weatherData.humidity}%
                    <br/>
                    Wind: {weatherData.wind} m/s
                </Typography>
                <Typography variant="body1">
                    Temperature: {weatherData.main.temp}°C
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    <img src={`http://openweathermap.org/img/w/${weatherData.icon}.png`} alt="weather icon"/>
                </Typography>

            </CardContent>
        </Card>
    );
};

export default WeatherData;