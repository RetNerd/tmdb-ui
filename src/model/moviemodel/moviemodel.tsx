
export default class Movie{
    readonly thumbUrl: String;
    readonly name: String;
    readonly category: String;
    readonly score: String;
    readonly details: String;
    constructor(thumbUrl:String,name:String, category:String, score:String, details:String){
        this.name = name;
        this.category = category;
        this.score = score;
        this.details = details;
        this.thumbUrl = thumbUrl;
    }
}