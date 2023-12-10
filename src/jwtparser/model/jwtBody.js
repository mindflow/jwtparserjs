import { Map, StringUtils } from "coreutil_v1"
import { AudienceClaim } from "./body/audienceClaim.js";
import { JwtEntry } from "./jwtEntry.js";
import { ExpiryClaim } from "./body/expiryClaim.js";
import { IssuerClaim } from "./body/issuerClaim.js";
import { JwtIdClaim } from "./body/jwtIdClaim.js";
import { NotBeforeClaim } from "./body/notBeforeClaim.js";
import { SubjectClaim } from "./body/subjectClaim.js";
import { IssuedAtClaim } from "./body/issuedAtClaim.js";
import { ScopeClaim } from "./body/scopeClaim.js";


export class JwtBody {

    constructor(claimsObject = null) {

        this.namedClaims = this.asMap(claimsObject);

    }

    /**
     * 
     * @param {*} value 
     * @param {*} className 
     * @returns {*}
     */
    asTypedClaim(value, className) {
        return new className(value);
    }

    asMap(claimsObject) {
        const namedClaims = new Map();
        if (claimsObject === null) {
            return namedClaims;
        }
        for ( const [key, value] of Object.entries(claimsObject)) {
            namedClaims.set(key, this.asMappedClaim(key, value));
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

    /**
     * 
     * @param {String} name 
     * @returns {JwtEntry}
     */
     getNamedClaimValue(name) {
        if (this.namedClaims.get(name)) {
            return this.namedClaims.get(name).value;
        }
        return null;
    }

    /**
     * 
     * @param {String} key 
     * @param {String} value 
     * @returns {JwtEntry}
     */
    asMappedClaim(key, value) {

        if (StringUtils.nonNullEquals(key, SubjectClaim.NAME)) {
            return this.asTypedClaim(value, SubjectClaim);
        }
        if (StringUtils.nonNullEquals(key, IssuerClaim.NAME)) {
            return this.asTypedClaim(value, IssuerClaim);
        }
        if (StringUtils.nonNullEquals(key, AudienceClaim.NAME)) {
            return this.asTypedClaim(value, AudienceClaim);
        }
        if (StringUtils.nonNullEquals(key, JwtIdClaim.NAME)) {
            return this.asTypedClaim(value, JwtIdClaim);
        }
        if (StringUtils.nonNullEquals(key, ExpiryClaim.NAME)) {
            return this.asTypedClaim(value, ExpiryClaim);
        }
        if (StringUtils.nonNullEquals(key, NotBeforeClaim.NAME)) {
            return this.asTypedClaim(value, NotBeforeClaim);
        }
        if (StringUtils.nonNullEquals(key, IssuedAtClaim.NAME)) {
            return this.asTypedClaim(value, IssuedAtClaim);
        }
        if (StringUtils.nonNullEquals(key, ScopeClaim.NAME)) {
            return this.asTypedClaim(value, ScopeClaim);
        }
        return new JwtEntry(key, value);
         
    }

    get sub() {
        return this.getNamedClaimValue(SubjectClaim.NAME);
    }

    get iss() {
        return this.getNamedClaimValue(IssuerClaim.NAME);
    }

    get aud() {
        return this.getNamedClaimValue(AudienceClaim.NAME);
    }

    get jti() {
        return this.getNamedClaimValue(JwtIdClaim.NAME);
    }

    get exp() {
        return this.getNamedClaimValue(ExpiryClaim.NAME);
    }

    get nbf() {
        return this.getNamedClaimValue(NotBeforeClaim.NAME);
    }

    get iat() {
        return this.getNamedClaimValue(IssuedAtClaim.NAME);
    }

    get scope() {
        return this.getNamedClaimValue(ScopeClaim.NAME);
    }
}