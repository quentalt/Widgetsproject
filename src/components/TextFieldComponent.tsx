import React from 'react';
import {AppBar, Box, IconButton, TextField} from "@mui/material";

interface Props {
    place : string;
    setPlace : (place : string) => void;

}

export default function TextFieldComponent (props : Props) {
    return (

                <Box sx={{display: 'flex', justifyContent: 'center'}}>
                    <TextField
                        id="outlined-basic"
                        label="Rechercher une ville"
                        variant="outlined"
                        value={props.place}
                        onChange={(event) => props.setPlace(event.target.value)}
                    />
                </Box>


    );

}