import request from "superagent";

const WIKI_URL = "https://en.wikipedia.org/w/api.php";

export function searchWiki(searchTerm: String){
    let hit: string;
    let result: string;
    
    return new Promise<string>((resolve, reject)=>{
        queryForPages(searchTerm).then((data: any)=>{
            hit = data.body?.query?.search[0]?.title;
            if(!hit){
                result = "Couldn't find anything :/"
                resolve(result);
            }
            getContent(hit).then((page)=>{
                result=page.body?.parse?.text;
                resolve(result);
            });
        }, (e: any)=>{
            result = `Error encountered: ${e}`.toString();
            reject(result);
        });
    })

}

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