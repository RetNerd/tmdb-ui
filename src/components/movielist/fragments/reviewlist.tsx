import { KeyboardArrowUp, KeyboardArrowDown } from "@mui/icons-material";
import { Stack, Box, Typography, IconButton, Collapse } from "@mui/material";
import React from "react";
import Review from "../../../model/reviewmodel";

function RenderedReview(props: {data:Review}){
    const { data } = props;

    return ( <React.Fragment>
                <Stack>
                    <Box>
                        <Typography className="review-author" variant="h5" component="div" style={{margin: 20}}>{data.author}</Typography>
                        <Typography className="review-content" variant="body1" component="div" style={{margin: 30}}>{data.content}</Typography>
                    </Box>
                </Stack>
        </React.Fragment>
        )
}

export function ReviewList(props: {name: String, data: Review[]}){
    const {name, data } = props;
    const [open, setOpen] = React.useState(false);

return(
    <React.Fragment>
        <Stack direction="row">
            <IconButton
                size="small"
                aria-label="expand row"
                onClick={()=> setOpen(!open)}
                >
                {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
            </IconButton>
            <Typography className="movie-detail" variant="h4" component="div" style={{margin: 20}}>{ name }</Typography>
        </Stack>
        <Collapse in={open} unmountOnExit>
            <Stack>
                {data.length > 0 ? 
                data.map((rv: Review)=>(
                    <RenderedReview key={rv.id.toString()} data={rv}/>
                ))
                :<Typography className="cast-name" variant="body1" component="div" style={{margin: 20}}>No reviews yet</Typography>}
            </Stack>
        </Collapse>
    </React.Fragment>)
}