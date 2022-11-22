import { JwtEntry } from "../jwtEntry.js";

export class IssuerClaim extends JwtEntry {

    static get NAME() { return "iss"; }

    /**
     * 
     * @param {String} value 
     */
    constructor(value) {
        super(IssuerClaim.NAME, value);
    }

    get label() {
        return "Issuer";
    }
}