import { JwtEntry } from "../jwtEntry.js";

export class NotBeforeClaim extends JwtEntry {

    static get NAME() { return "nbf"; }

    /**
     * 
     * @param {String} value 
     */
    constructor(value) {
        super(NotBeforeClaim.NAME, value)
    }

}