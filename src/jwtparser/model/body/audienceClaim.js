import { JwtEntry } from "../jwtEntry.js";

export class AudienceClaim extends JwtEntry {

    static get NAME() { return "aud"; }

    /**
     * 
     * @param {String} value 
     */
    constructor(value) {
        super(AudienceClaim.NAME, value);
    }

    get label() {
        return "Audience";
    }
}