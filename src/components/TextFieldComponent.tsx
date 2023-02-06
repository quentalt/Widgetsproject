import { Box } from '@mui/system';
import TextField from '@mui/material/TextField';


interface Props {
    place : string;
    setPlace : (place : string) => void;

}



export default function TextFieldComponent (props : Props) {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <TextField
                id="outlined-basic"
                label="Rechercher une ville"
                variant="outlined"
                value={props.place}
                onChange={event => props.setPlace(event.target.value)}
            />
        </Box>
    );
}
