import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Collapse, Typography, Box, IconButton } from "@mui/material";
import {KeyboardArrowUp, KeyboardArrowDown} from '@mui/icons-material';

import React from "react";
import Movie from "../../model/moviemodel";
import "./movielist.css"

export default class MovieList extends React.Component{
    data: Movie[]=[
        new Movie("The Batman", "Crime, Mystery, Thriller", "7.8", "In his second year of fighting crime, Batman uncovers corruption in Gotham City that connects to his own family while facing a serial killer known as the Riddler."),
        new Movie("The Batman", "Crime, Mystery, Thriller", "7.8", "In his second year of fighting crime, Batman uncovers corruption in Gotham City that connects to his own family while facing a serial killer known as the Riddler."),
        new Movie("The Batman", "Crime, Mystery, Thriller", "7.8", "In his second year of fighting crime, Batman uncovers corruption in Gotham City that connects to his own family while facing a serial killer known as the Riddler.")
    ];

    constructor(props: Object){
        super(props);
    }

    render(){
        return (
            <TableContainer id="movie-table" component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell className="movie-cell"></TableCell>
                            <TableCell className="movie-cell">Name</TableCell>
                            <TableCell className="movie-cell">Category</TableCell>
                            <TableCell className="movie-cell">Score</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.data.map((movie, idx) => (
                            <Row key = {idx} row = {movie}/> 
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        )
    }

    
}

function Row(props: {row: Movie}){
    const {row} = props;
    const [open, setOpen] = React.useState(false);
    return(
        <React.Fragment>
            <TableRow>
                <TableCell className="movie-cell">
                        <IconButton
                        size="small"
                        aria-label="expand row"
                        onClick={()=> setOpen(!open)}
                        >
                        {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                        </IconButton>
                </TableCell>
                <TableCell className="movie-cell">{row.name}</TableCell>
                <TableCell className="movie-cell">{row.category}</TableCell>
                <TableCell className="movie-cell">{row.score}
            </TableCell>
            </TableRow>
            <TableRow>
                <TableCell className="movie-detail-cell" style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={4}>
                    <Collapse in={open} unmountOnExit>
                        <Box>
                            <Typography className="movie-detail" variant="body1" component="div" gutterBottom>
                            {row.details}
                            </Typography>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    )
}