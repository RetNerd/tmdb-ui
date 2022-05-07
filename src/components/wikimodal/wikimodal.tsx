import {  Link, Modal,  Typography, Box, CircularProgress, Stack } from "@mui/material";
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
/**
 * A modal window for content retrieved from wikipedia, the content is rendered directly from the wikipedia api
 * 
 * @param props - {name: the displayed text, searchTerm: the wikipedia searchterm, movieId: the id of the movie, relatedHandler: function passed down from searchpage to update content}
 * @returns A react fragment of the modal window
 */

export function WikiModalLink(props: {name: String ,searchTerm: String, movieId: String, relatedHandler:Function}){
  const {searchTerm, name, movieId, relatedHandler} = props;
  const [modalOpen, setModalOpen] = React.useState(false);
  const [content, setContent] = React.useState({content: "", page:""});
  const [loading, setLoading] = React.useState(false);
  let page;
  const handleOpen = () => {
      setModalOpen(true);
      setLoading(true);
      searchWiki(searchTerm).then((data:any)=>{
          setContent(data);
          setLoading(false);
      },(e)=>{
        setContent(e);
        setLoading(false);
      })
    };
  const handleRelated = () =>{
      handleClose();
      relatedHandler(movieId);

  }  
  const handleClose = () => setModalOpen(false);
  if(!loading){
      page = <Typography color="primary" variant="body1">
      {parse(content.content)}
  </Typography>
  }else{
      page = <CircularProgress color="secondary" className="progress-indicator" />
  }
    return(
        <React.Fragment>
                <Link variant="body1" color="secondary" onClick={handleOpen} style={{margin: 20}}>
                {name}</Link>
                <Modal
                style={{overflow: "hidden"}}
                open={modalOpen}
                onClose={handleClose}>
                    <Box sx={style} className="modal-box">
                        <Stack>
                        <Link onClick={handleRelated}>Related</Link>
                        <Link target="_blank" href={"https://en.wikipedia.org/wiki/"+encodeURIComponent(content.page)}>WIKI</Link>
                        </Stack>
                        { page }
                    </Box>
                </Modal>
        </React.Fragment>
    )
}