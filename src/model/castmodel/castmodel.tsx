export default class Cast{
    readonly id: String;
    readonly person: {name: String};
    readonly role: {character: String};
    constructor(id: String, person: {name: String}, role: {character: String}){
        this.id = id;
        this.person = person || {name: ""};
        this.role = role;
    }
    static createCast(cast: any){
        return new Cast(cast.id, cast.person, cast.role);
    }
}