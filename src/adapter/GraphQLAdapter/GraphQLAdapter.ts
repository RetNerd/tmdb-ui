import request, { gql } from 'graphql-request'

const MOVIES_QUERY = gql`
query fetchMovies{
    movies: discoverMovies{
        id
        name
        overview
        releaseDate
        score
        genres {
            name
        }
        img: poster {
            url: custom(size: "w185_and_h278_bestv2")
          }
    }
}`;

const SEARCH_QUERY = gql`
query SearchMovies($term: String!) {
    movies: searchMovies(query: $term) {
        id
        name
        overview
        releaseDate
        score
        genres {
            name
        }
        img: poster {
            url: custom(size: "w185_and_h278_bestv2")
          }
    }
  }
`

/**
    * Gets the list of movies
    * 
    * @param offset - The position of the cursor on the movie list
    * @param limit - The number of movies to fetch
    * 
    * @returns loading: Query status indicator to show if the query is completed
    * @returns data: The fetched data
    * @returns fetchMore: A function to query for more data
    */

export function fetchMovies(graphqlUrl: string){
    return request(graphqlUrl, MOVIES_QUERY);
     
}

export function searchMovies(graphqlUrl: string, term: string){
    return request(graphqlUrl, SEARCH_QUERY, {"term": term});
    
}
