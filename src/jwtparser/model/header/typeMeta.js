import { JwtEntry } from "../jwtEntry.js";

export class TypeMeta extends JwtEntry {

    static get NAME() { return "typ"; }

    /**
     * 
     * @param {String} value 
     */
    constructor(value) {
        super(TypeMeta.NAME, value)
    }

}