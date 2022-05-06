import { KeyboardArrowUp, KeyboardArrowDown } from "@mui/icons-material";
import { Collapse, IconButton, Link, Modal, Stack, Typography, Box, CircularProgress } from "@mui/material";
import React from "react";
import { searchWiki } from "../../adapter/WikiAdapter/WikiAdapter";
import parse from 'html-react-parser'

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '70%',
    height: '70%',
    bgcolor: '#FFFFFF',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    overflow: "scroll"
  };

export function WikiModalLink(props: {name: String ,searchTerm: String}){
  const {searchTerm, name} = props;
  const [open, setOpen] = React.useState(false);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [content, setContent] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  let page;
  const handleOpen = () => {
      setModalOpen(true);
      setLoading(true);
      searchWiki(searchTerm).then((data:string)=>{
          setContent(data);
          setLoading(false);
      },(e)=>{
        setContent(e);
        setLoading(false);
      })
      
    };
  const handleClose = () => setModalOpen(false);
  if(!loading){
      page = <Typography color="primary" variant="body1">
      {parse(content)}
  </Typography>
  }else{
      page = <CircularProgress color="secondary" className="progress-indicator" />
  }
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
                <Typography className="cast-name" variant="h4" component="div" style={{margin: 20}}>{ name }</Typography>
                </Stack>
            <Collapse in={open} unmountOnExit>
                <Link variant="h5" color="secondary" onClick={handleOpen} style={{margin: 20}}>
                Wikipedia</Link>
                <Modal
                style={{overflow: "hidden"}}
                open={modalOpen}
                onClose={handleClose}>
                    <Box sx={style} className="modal-box">
                        { page }
                    </Box>
                </Modal>
            </Collapse>
        </React.Fragment>
    )
}