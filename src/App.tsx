import React, {useState} from "react";
import { WidthProvider, Responsive } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import TextFieldComponent from "./components/TextFieldComponent";
import CloseIcon from '@mui/icons-material/Close';
import WeatherData from "./components/WeatherData";
import MapboxData from "./components/MapboxData";
import {v1 as uuidv1} from "uuid";
import {
    AppBar,
    Box,
    Button, CssBaseline,
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    Toolbar,
    Typography,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Brightness4Icon from "@mui/icons-material/Brightness4";

const ResponsiveReactGridLayout = WidthProvider(Responsive);


function App() {
    const [isDarkTheme, setIsDarkTheme] = useState(false);
    const [places, setPlaces] = useState<string[]>([]);
    const [items, setItems] = useState<{ id: string; component: JSX.Element }[]>([]);

    const changeTheme = () => {
        setIsDarkTheme(!isDarkTheme);
    };

    const addItem = (component: JSX.Element) => {
        setItems([...items, {id: uuidv1(), component}]);
    };

    const addWeatherData = () => {
        setItems([...items, {
            id: uuidv1(), component: <WeatherData place={places[0]
            }/>
        }]);
    };

    /*  const addMapboxData = () => {
          setItems([...items, { id: uuidv1(), component: <MapboxData /> }]);
      };*/


    const removeItem = (id: string) => {
        setItems(items.filter(item => item.id !== id));
    };



    const theme = createTheme({
            palette: {
                mode: isDarkTheme ? "dark" : "light",
            }
        }
    );

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Box sx={{flexGrow: 1}}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                            Widgets App
                        </Typography>
                        <IconButton onClick={changeTheme}>
                            {isDarkTheme ? <Brightness7Icon/> : <Brightness4Icon/>
                            }
                        </IconButton>
                    </Toolbar>
                </AppBar>
            </Box><br/>
            <TextFieldComponent place={places[0]} setPlace={place => setPlaces([place])}/>
            <br/>
            <Button
            variant="contained" color="secondary" onClick={addWeatherData}>Ajouter un widget
            météo</Button>
            
            <ResponsiveReactGridLayout
            className="layout"
            rowHeight={30}
            breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
            cols={{lg: 12, md: 10, sm: 6, xs: 4, xxs: 2}}
            isDraggable
            isResizable
        >

            {items.map(item => (
                <div key={item.id} data-grid={{x: 0, y: 0, w: 2, h: 2, minW: 2, minH: 2}}>
                    <CloseIcon onClick={() => removeItem(item.id)}/>
                    {item.component}
                </div>
            ))}
        </ResponsiveReactGridLayout>
            <div>
                <FormControl sx={{m: 1, minWidth: 120}}
                             variant="standard">

                    <InputLabel
                        id="demo-simple-select-autowidth-label">Widgets</InputLabel>
                    <Select
                        labelId="demo-simple-select-autowidth-label"
                        id="demo-simple-select-autowidth"
                        autoWidth
                        label="Widgets"
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={1} onClick={() => addItem(<WeatherData place={places[0]}/>)}>
                            Weather
                        </MenuItem>
                        <MenuItem value={2} onClick={() => addItem(<MapboxData/>)}>
                            Map
                        </MenuItem>
                    </Select>
                </FormControl>
            </div>
        </ThemeProvider>
    );
}

export default App;
