import { JwtEntry } from "../jwtEntry.js";

export class ExpiryClaim extends JwtEntry {

    static get NAME() { return "exp"; }

    /**
     * 
     * @param {String} value 
     */
    constructor(value) {
        super(ExpiryClaim.NAME, value);
    }

    get formattedValue() {
        const date = new Date(this.value * 1000);
        return "" + date.getFullYear() + "-" +
                (date.getMonth() + 1) + "-" + 
                date.getDate() + " " + 
                date.getHours() + ":" + 
                date.getMinutes() + ":" + 
                date.getSeconds();
    }

    get label() {
        return "Expiry";
    }

}