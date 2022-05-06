import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

import React from "react";
import Movie from "../../model/moviemodel";
import "./movielist.css"
import { Row } from "./fragments/row";

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
                            <TableCell className="movie-cell">Released</TableCell>
                            <TableCell className="movie-cell">Score</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.data.map((movie: Movie) => (
                            <Row key = {movie.id.toString()} row = {movie}/> 
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        )
    }

    
}






