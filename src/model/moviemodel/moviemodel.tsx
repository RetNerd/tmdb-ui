import Cast from "../castmodel";
import Review from "../reviewmodel";

export default class Movie{
    readonly id: String;
    readonly thumbUrl: String;
    readonly name: String;
    readonly category: String;
    readonly score: String;
    readonly details: String;
    readonly reviews: Review[];
    readonly cast: Cast[];
    constructor(id: String, thumbUrl:String,name:String, category:String, score:String, details:String, reviews: Review[], cast: Cast[]){
        this.id = id;
        this.name = name;
        this.category = category;
        this.score = score;
        this.details = details;
        this.thumbUrl = thumbUrl;
        this.reviews = reviews;
        this.cast = cast;
    }

}