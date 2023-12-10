import { JwtEntry } from "../jwtEntry.js";

export class ScopeClaim extends JwtEntry {

    static get NAME() { return "scope"; }

    /**
     * 
     * @param {String} value 
     */
    constructor(value) {
        super(ScopeClaim.NAME, value);
    }

    get formattedValue() {
        return this.value;
    }

    get label() {
        return "Scopes";
    }

}