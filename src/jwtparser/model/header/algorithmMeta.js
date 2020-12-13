import { JwtEntry } from "../jwtEntry.js";

export class AlgorithmMeta extends JwtEntry {

    static get NAME() { return "alg"; }

    /**
     * 
     * @param {String} value 
     */
    constructor(value) {
        super(AlgorithmMeta.NAME, value)
    }

}