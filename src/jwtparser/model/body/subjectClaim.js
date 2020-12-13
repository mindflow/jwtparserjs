import { JwtEntry } from "../jwtEntry.js";

export class SubjectClaim extends JwtEntry {

    static get NAME() { return "sub"; }

    /**
     * 
     * @param {String} value 
     */
    constructor(value) {
        super(SubjectClaim.NAME, value)
    }

}