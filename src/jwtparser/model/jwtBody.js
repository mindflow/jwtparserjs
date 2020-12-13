import { Map } from "coreutil_v1"
import { AudienceClaim } from "./body/audienceClaim.js";
import { JwtEntry } from "./jwtEntry.js";
import { ExpiryClaim } from "./body/expiryClaim.js";
import { IssuerClaim } from "./body/issuerClaim.js";
import { JwtIdClaim } from "./body/jwtIdClaim.js";
import { NotBeforeClaim } from "./body/notBeforeClaim.js";
import { SubjectClaim } from "./body/subjectClaim.js";
import { IssuedAtClaim } from "./body/issuedAtClaim.js";


export class JwtBody {

    constructor(claimsObject = null) {

        /**
         * @type {SubjectClaim}
         */
        this.subject = this.getClaim(claimsObject, SubjectClaim.NAME, SubjectClaim);

        /**
         * @type {IssuerClaim}
         */
        this.issuer = this.getClaim(claimsObject, IssuerClaim.NAME, IssuerClaim);

        /**
         * @type {AudienceClaim}
         */
        this.audience = this.getClaim(claimsObject, AudienceClaim.NAME, AudienceClaim);

        /**
         * @type {JwtIdClaim}
         */
        this.jwtId = this.getClaim(claimsObject, JwtIdClaim.NAME, JwtIdClaim);

        /**
         * @type {ExpiryClaim}
         */
        this.expiry = this.getClaim(claimsObject, ExpiryClaim.NAME, ExpiryClaim);

        /**
         * @type {NotBeforeClaim}
         */
        this.notBefore = this.getClaim(claimsObject, NotBeforeClaim.NAME, NotBeforeClaim);

        /**
         * @type {NotBeforeClaim}
         */
        this.issuedAt = this.getClaim(claimsObject, IssuedAtClaim.NAME, NotBeforeClaim);

        /**
         * @type {Map}
         */
        this.namedClaims = this.asMap(claimsObject);
    }

    /**
     * 
     * @param {*} claimsObject 
     * @param {*} attributeName 
     * @returns {*}
     */
    getClaim(claimsObject, attributeName, className) {
        if (claimsObject === null) {
            return null;
        }
        const claimsValue = claimsObject[attributeName];
        if(claimsValue === null || claimsValue === undefined) {
            return null;
        }
        return new className(claimsValue);
    }

    asMap(claimsObject) {
        const namedClaims = new Map();
        if (claimsObject === null) {
            return namedClaims;
        }
        for ( const [key, value] of Object.entries(claimsObject)) {
            namedClaims.set(key, new JwtEntry(key, value));
        }
        return namedClaims;
    }

    /**
     * 
     * @param {String} name 
     * @returns {JwtEntry}
     */
    getNamedClaim(name) {
        return this.namedClaims.get(name);
    }

}