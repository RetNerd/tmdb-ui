export default class Review {
    readonly id: String;
    readonly author: String;
    readonly content: String;

    constructor(id: String, author: String, content: String){
        this.id = id;
        this.author = author;
        this.content = content;
    }

    static createReview(review: any){
        return new Review(review.id, review.author, review.content);
    }
}