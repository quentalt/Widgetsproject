import  { useState, useEffect } from 'react';
import {Card, CardContent, Typography} from "@mui/material";

interface Props {
    location: string;
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


const WeatherData = ({ location }: Props) => {
    const [weatherData, setWeatherData] = useState<Weather | null>(null);


    useEffect(() => {
        const fetchData = async () => {
            if (!location) {
                return;
            }

            const API_KEY = '472c6fee4852e3b5f29805372257c5f6';
            const API_URL = `http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}`;


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
    }, [location]);


    if (!weatherData) {
        return <div>Loading weather data...</div>;
    }
    return (
        <Card sx={{minWidth: 275}}>
            <CardContent>
                <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                    Weather in {location}
                </Typography>
                <Typography variant="h5" component="div">
                    {weatherData.weather}
                </Typography>
                <Typography sx={{mb: 1.5}} color="text.secondary">
                    Temperature: {weatherData.main.temp.toFixed(1)} °C
                </Typography>
                <Typography sx={{mb: 1.5}} color="text.secondary">
                    Humidity: {weatherData.humidity} %
                </Typography>
                <Typography sx={{mb: 1.5}} color="text.secondary">
                    Wind: {weatherData.wind} m/s
                </Typography>
                <img src={`http://openweathermap.org/img/w/${weatherData.icon}.png`} alt="weather icon"/>
            </CardContent>
        </Card>
    );

};

export default WeatherData;