import { JwtEntry } from "../jwtEntry.js";

export class IssuedAtClaim extends JwtEntry {

    static get NAME() { return "iat"; }

    /**
     * 
     * @param {String} value 
     */
    constructor(value) {
        super(IssuedAtClaim.NAME, value)
    }

}