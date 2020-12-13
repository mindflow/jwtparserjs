import { JwtEntry } from "../jwtEntry.js";

export class ExpiryClaim extends JwtEntry {

    static get NAME() { return "exp"; }

    /**
     * 
     * @param {String} value 
     */
    constructor(value) {
        super(ExpiryClaim.NAME, value)
    }

}