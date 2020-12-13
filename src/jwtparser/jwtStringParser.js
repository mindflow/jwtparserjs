import { Jwt } from "./model/jwt.js";
import { JwtBody } from "./model/jwtBody.js";
import { JwtHeader } from "./model/jwtHeader.js";

export class JwtStringParser {

    /**
     * 
     * @param {String} jwtString
     * @returns {Jwt} jwt
     */
    static parseString(jwtString) {
        /**
         * @type [Array]
         */
        const jwtParts = jwtString.split(".");
        if(jwtParts.length < 2) {
            throw "JWT does not have a body";
        }
        
        const headerDecoded = atob(jwtParts[0]);
        const headerObject = JSON.parse(headerDecoded);
        const jwtHeader = new JwtHeader(headerObject);

        const bodyDecoded = atob(jwtParts[1]);
        const bodyObject = JSON.parse(bodyDecoded);
        const jwtBody = new JwtBody(bodyObject);

        return new Jwt(jwtString, jwtHeader, jwtBody);
    }

}