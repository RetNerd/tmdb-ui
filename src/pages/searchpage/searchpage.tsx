import React from "react";
import MovieList from "../../components/movielist";
import SearchField from "../../components/searchfield";
import "./searchpage.css"

export default class SearchPage extends React.Component{
    constructor(props: Object){
        super(props)
    }
    render(){
    return(
        <div className="searchPage">
            <SearchField></SearchField>
            <MovieList></MovieList>
        </div>
    );
    }
}

