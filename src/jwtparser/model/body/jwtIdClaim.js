import { JwtEntry } from "../jwtEntry.js";

export class JwtIdClaim extends JwtEntry {

    static get NAME() { return "jti"; }

    /**
     * 
     * @param {String} value 
     */
    constructor(value) {
        super(JwtIdClaim.NAME, value)
    }

}