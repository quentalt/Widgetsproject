import { Box } from '@mui/system';
import TextField from '@mui/material/TextField';
import {PaletteMode, ThemeProvider} from "@mui/material";
import {grey} from "@mui/material/colors";
import {createTheme} from "@mui/material/styles";

interface Props {
    place : string;
    setPlace : (place : string) => void;

}

const getDesignTokens = (mode: PaletteMode) => ({
    palette: {
        mode,
        text: {
            ...(mode === 'dark'
                ? {
                    primary: grey[900],
                    secondary: grey[500],
                }
                : {
                    primary: grey[900],
                    secondary: grey[500],
                }),
        },
    },
});

const darkModeTheme = createTheme(getDesignTokens('dark'));


export default function TextFieldComponent (props : Props) {
    return (
        <ThemeProvider theme={darkModeTheme}>
        <Box sx={{ flexGrow: 1 }}>
            <TextField
                id="outlined-basic"
                label="Rechercher une ville"
                variant="outlined"
                value={props.place}
                onChange={event => props.setPlace(event.target.value)}
            />
        </Box>
        </ThemeProvider>
    );
}
