import { Button, CircularProgress, Stack } from "@mui/material";
import React from "react";
import { fetchMovies, getRecommended, searchMovies } from "../../adapter/GraphQLAdapter/GraphQLAdapter";
import MovieList from "../../components/movielist";
import SearchField from "../../components/searchfield";
import Movie from "../../model/moviemodel";
import "./searchpage.css"
import Review from "../../model/reviewmodel";
import Cast from "../../model/castmodel";

/**
 * The page holding the searchbar and the list of movies
 */

export default class SearchPage extends React.Component<{}, {data:Movie[], loading:boolean}>{
    movieList:React.RefObject<MovieList>;
    searchField:React.RefObject<SearchField>;
    graphQlUrl: string;
    constructor(props: Object){
        super(props)
        this.movieList = React.createRef();
        this.searchField = React.createRef();
        this.state = {data:[], loading: false};
        this.updateData = this.updateData.bind(this);
        this.getSearchFieldData = this.getSearchFieldData.bind(this);
        this.searchMovies = this.searchMovies.bind(this);
        this.marshalMovies = this.marshalMovies.bind(this);
        this.getRelated = this.getRelated.bind(this);
        this.graphQlUrl = "https://tmdb.sandbox.zoosh.ie/dev/graphql";
    }
    componentDidMount(){
        if(!this.state.loading){
            this.setState((state)=>{
                return {data:[], loading:true}
            });
            fetchMovies(this.graphQlUrl).then((data)=>{
                let movies = this.marshalMovies(data);
                this.updateData(movies);
                this.setState((state)=>{
                    return {data:movies, loading:false}
                });
            });
        }
    }

    /**
     * Marshals the data from the graphql query into Movie objects
     * 
     * @param data - Data returned from a movie query
     * @returns An array of Movie objects
     */

    marshalMovies(data: any): Movie[]{
       return data.movies.map((element:any) => {
            let genres = element.genres.map((genre: any)=>{
                return genre.name;
            }).join(",");
                let imgUrl = element.img ? element.img.url : "data:image/gif;base64,R0lGODlhAQABAAAAACwAAAAAAQABAAA=";
                let reviews = element.reviews.map((rv: any)=>{
                    return Review.createReview(rv);
                });
            let cast = element.cast.map((cast: any)=>{
                return Cast.createCast(cast);
            });
            return new Movie(element.id, imgUrl, element.name,genres , element.score, element.overview, reviews, cast, element.releaseDate);
        });
    }


    updateData(data:Movie[]){
        this.movieList.current?.setState(()=>{
            return {data: data}
        });
    }

    getSearchFieldData(): string|undefined{
        return this.searchField.current?.getValue();
    }

    /**
     * Performs a search for the search term provided in the searchfield, and updates the page data with the results
     * 
     */

    searchMovies(){
        let term = this.getSearchFieldData();
        if(!term){
            return;
        }
        this.setState((state)=>{
            return {data:[], loading:true}
        });
        searchMovies(this.graphQlUrl, term).then((data)=>{
            let movies = this.marshalMovies(data);
            this.updateData(movies);
            this.setState((state)=>{
                return {data:movies, loading:false}
            });
        });
    }

    /**
     * Performs a search for the id of the clicked movie, and updates the page data with the results
     * 
     */

    getRelated(id:string){
        this.setState((state)=>{
            return {data:[], loading:true}
        });
        getRecommended(this.graphQlUrl, id).then((data)=>{
            let recommended = {movies: data.movie.recommended};
            let movies = this.marshalMovies(recommended);
            this.updateData(movies);
            this.setState((state)=>{
                return {data:movies, loading:false}
            });
        });
    }


    render(){
        let movies;
        if(this.state.loading){
            movies = <CircularProgress color="secondary" className="progress-indicator" />
        }else{
            movies = <MovieList relatedHandler={this.getRelated} data={this.state.data} ref={this.movieList}></MovieList>
        }
        return(
            <div color="primary" className="search-page">
                <Stack direction="row">
                    <Stack className="left-panel">
                        <SearchField ref={this.searchField}></SearchField>
                        <Button color="secondary" style={{marginLeft: 20, marginBottom: 20}} variant="outlined" className="search-button" onClick={this.searchMovies}>Search</Button>
                    </Stack>
                    {movies}
                </Stack>
            </div>
        );
    }
}

