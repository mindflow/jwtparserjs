import { JwtEntry } from "../jwtEntry.js";

export class KeyIdMeta extends JwtEntry {

    static get NAME() { return "kid"; }

    /**
     * 
     * @param {String} value 
     */
    constructor(value) {
        super(KeyIdMeta.NAME, value)
    }

}