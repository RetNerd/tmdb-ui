import { KeyboardArrowUp, KeyboardArrowDown } from "@mui/icons-material";
import { Stack, IconButton, Typography, List, ListItemText, ListItem, Collapse } from "@mui/material";
import React from "react";
import Cast from "../../../model/castmodel";

/**
 * React fragment to represent the cast subpage
 * 
 * @param props - props object holding the elements highlighted name and the array of cast objects to display
 * @returns - A react fragment
 */

export function CastList(props: {name: String, data: Cast[]}){
    const {name, data } = props;
    const [open, setOpen] = React.useState(false);

    return (
        <React.Fragment>
            <Stack direction="row">
                <IconButton
                    size="small"
                    aria-label="expand row"
                    onClick={()=> setOpen(!open)}
                    >
                    {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                </IconButton>
                <Typography className="cast-name" variant="h4" component="div" style={{margin: 20}}>{ name }</Typography>
                </Stack>
            <Collapse in={open} unmountOnExit>
                <List aria-label="cast-list" style={{margin: 30}}>
                    {data.map((cast: Cast)=>(
                        <ListItem key={cast.id.toString()}>
                            <ListItemText>{cast.person.name} as {cast.role.character}</ListItemText>
                        </ListItem>
                    ))}
                </List>
            </Collapse>
        </React.Fragment>
    );
}