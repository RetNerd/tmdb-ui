import { KeyboardArrowUp, KeyboardArrowDown } from "@mui/icons-material";
import { TableRow, TableCell, IconButton, Collapse, Typography, List } from "@mui/material";
import React from "react";
import Movie from "../../../model/moviemodel";
import { WikiModalLink } from "../../wikimodal/wikimodal";
import { CastList } from "./castlist";
import { ReviewList } from "./reviewlist";

export function Row(props: {row: Movie}){
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
                <TableCell className="movie-cell thumbnail"><img alt="Not provided" src={row.thumbUrl.toString()} 
                /></TableCell>
                <TableCell className="movie-cell">{row.name}</TableCell>
                <TableCell className="movie-cell">{row.category}</TableCell>
                <TableCell className="movie-cell">{row.released.getFullYear()}</TableCell>
                <TableCell className="movie-cell">{row.score}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell className="movie-detail-cell" style={{ padding: 0 }} colSpan={5}>
                    <Collapse in={open} unmountOnExit>
                        <List>
                            <Typography className="movie-detail" variant="h4" component="div" style={{margin: 20}}>Overview</Typography>
                            <Typography className="movie-detail" variant="body1" component="div" gutterBottom style={{margin: 20}}>
                                {row.details}
                            </Typography>
                            <ReviewList name="Reviews" data={row.reviews}/>
                            <CastList name="Cast" data={row.cast}/>
                            <WikiModalLink name="External" searchTerm={row.name+" (movie) "+row.released.getFullYear()}></WikiModalLink>
                        </List>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    )
}