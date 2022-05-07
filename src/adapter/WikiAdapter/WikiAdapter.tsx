import request from "superagent";

const WIKI_URL = "https://en.wikipedia.org/w/api.php";

/**
 * Performs a wiki search and returns the related page content as an html string
 * 
 * @param searchTerm - the term to search for
 * @returns - HTML string or an error message
 */

export function searchWiki(searchTerm: String){
    let hit: string;
    let result: {content: string, page: string};
    
    return new Promise<{content: string, page: string}>((resolve, reject)=>{
        queryForPages(searchTerm).then((data: any)=>{
            hit = data.body?.query?.search[0]?.title;
            if(!hit){
                result = {content: "Couldn't find anything :/", page:""};
                resolve(result);
            }
            getContent(hit).then((page)=>{
                result={content: page.body?.parse?.text, page: hit};
                resolve(result);
            });
        }, (e: any)=>{
            result = {content:  handleError(e), page:""};
            reject(result);
        }).catch((e)=>{
            return {content:  handleError(e), page:""};
        });
    })

}

/**
 * Generic error handler
 * 
 * @param e - The error
 * @returns - Error message to display
 */
function handleError(e:any){
    return `Error encountered: ${e}`.toString();
}

/**
 * Searches wikipedia for relevant pages
 * 
 * @param searchTerm - The term to search for
 * @returns - A promise holding the list of related pages
 */

function queryForPages(searchTerm: String){
    const queryParams = {
        "action": "query",
        "format": "json",
        "list" : "search",
        "utf8" : 1,
        "srsearch": searchTerm,
        "origin": "*"
    };

    return request.get(WIKI_URL)
    .query(queryParams)
}

/**
 * Fetches a wikipedia page in html format
 * 
 * @param hit - the page name as it appeares in {@link queryForPages}
 * @returns - A promise holding the page object
 */

function getContent(hit: string){
    const queryParams = {
        "action": "parse",
        "format": "json",
        "prop": "text",
        "page": hit,
        "formatversion": 2,
        "origin": "*"
    };
    return request.get(WIKI_URL)
    .query(queryParams);
}