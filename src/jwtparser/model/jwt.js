import { JwtBody } from "./jwtBody.js";
import { JwtHeader } from "./jwtHeader.js";

export class Jwt {

    constructor(stringSource, jwtHeader, jwtBody) {
        /**
         * @type {String}
         */
        this.source = stringSource;

        /**
         * @type {JwtHeader}
         */
        this.header = jwtHeader;

        /**
         * @type {JwtBody}
         */
        this.body = jwtBody;
    }

}