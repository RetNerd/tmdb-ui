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
        reviews {
          id
          author
          content
          language {
            code
            name
          }
        }
        cast {
          id
          person {
            name
          }
          role {
            ... on Cast {
              character
            }
          }
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
        reviews {
          id
          author
          content
          language {
            code
            name
          }
        }
        cast {
          id
          person {
            name
          }
          role {
            ... on Cast {
              character
            }
          }
        }
      }
  }
`

const RECOMMENDED_QUERY = gql`query getMovie($id: ID!) {
  movie(id: $id) {
    recommended(limit: 20){
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
      reviews {
        id
        author
        content
        language {
          code
          name
        }
      }
      cast {
        id
        role {
          ... on Cast {
            character
          }
        }
      }
    }
  }
}`

/**
    * Gets the list of movies
    * 
    * @param offset - The position of the cursor on the movie list
    * @param limit - The number of movies to fetch
    * 
    * @returns - A promise holding the query results
*/
export function fetchMovies(graphqlUrl: string){
    return request(graphqlUrl, MOVIES_QUERY);
     
}

/**
 * Performs a search in the graphql db
 * 
 * @param graphqlUrl - The url of the database
 * @param term - The searchterm to query for
 * @returns - A promise holding the query results
 */

export function searchMovies(graphqlUrl: string, term: string){
    return request(graphqlUrl, SEARCH_QUERY, {"term": term});
    
}

/**
 * Performs a search for the recommendations of a movie
 * 
 * @param graphqlUrl - The url of the database
 * @param id - The id of the movie
 * @returns - A promise holding a list of movies
 */
export function getRecommended(graphqlUrl: string, id: string){
    return request(graphqlUrl, RECOMMENDED_QUERY, {"id": id});
}
