import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Collapse, Typography, Box, IconButton } from "@mui/material";
import {KeyboardArrowUp, KeyboardArrowDown} from '@mui/icons-material';

import React from "react";
import Movie from "../../model/moviemodel";
import "./movielist.css"

export default class MovieList extends React.Component<any, { data: Movie[] }>{

    constructor(props: any){
        super(props);
        this.state = {data: this.props.data};
    }

    updateData(data: Movie[]){
        this.setState((state)=>{
            return {data: data}
        })
    }

    render(){
        return (
            <TableContainer id="movie-table" component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell className="movie-cell"></TableCell>
                            <TableCell className="movie-cell"></TableCell>
                            <TableCell className="movie-cell">Name</TableCell>
                            <TableCell className="movie-cell">Category</TableCell>
                            <TableCell className="movie-cell">Score</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.data.map((movie: Movie, idx: Number) => (
                            <Row key = {idx.toString()} row = {movie}/> 
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
                <TableCell className="movie-cell collapse-button">
                        <IconButton
                        size="small"
                        aria-label="expand row"
                        onClick={()=> setOpen(!open)}
                        >
                        {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                        </IconButton>
                </TableCell>
                <TableCell className="movie-cell thumbnail"><img src={row.thumbUrl.toString()} 
                /></TableCell>
                <TableCell className="movie-cell">{row.name}</TableCell>
                <TableCell className="movie-cell">{row.category}</TableCell>
                <TableCell className="movie-cell">{row.score}
            </TableCell>
            </TableRow>
            <TableRow>
                <TableCell className="movie-detail-cell" style={{ padding: 0 }} colSpan={5}>
                    <Collapse in={open} unmountOnExit>
                        <Box>
                            <Typography className="movie-detail" variant="h4" component="div" style={{margin: 20}}>Overview</Typography>
                            <Typography className="movie-detail" variant="body1" component="div" gutterBottom style={{margin: 20}}>
                            {row.details}
                            </Typography>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    )
}