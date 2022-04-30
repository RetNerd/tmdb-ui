import { gql, useQuery } from "@apollo/client";

export class GraphQLAdapter{
    graphqlUrl: string;
    MOVIES_QUERY = gql`
    query fetchMovies{
        movies: discoverMovies{
            id
            name
            overview
            releaseDate
            img: poster {
                url: custom(size: "w185_and_h278_bestv2")
              }
        }
    }`;

    constructor(graphqlUrl: string){
        this.graphqlUrl = graphqlUrl;
    }

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
    fetchMovies(offset: number, limit:number){
        let {loading, data, fetchMore} = useQuery(this.MOVIES_QUERY, {
            variables: {
                offset: offset,
                limit: limit
            }
        });
        return {loading, data, fetchMore};
    }

}

