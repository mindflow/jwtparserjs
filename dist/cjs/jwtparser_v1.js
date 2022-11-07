'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var coreutil_v1 = require('coreutil_v1');

class JwtEntry {

    /**
     * 
     * @param {String} name 
     * @param {any} value 
     */
    constructor(name, value) {

        /**
         * @type {String}
         */
        this.name = name;

        /**
         * @type {any}
         */
        this.value = value;
    }

}

class AudienceClaim extends JwtEntry {

    static get NAME() { return "aud"; }

    /**
     * 
     * @param {String} value 
     */
    constructor(value) {
        super(AudienceClaim.NAME, value);
    }

}

class ExpiryClaim extends JwtEntry {

    static get NAME() { return "exp"; }

    /**
     * 
     * @param {String} value 
     */
    constructor(value) {
        super(ExpiryClaim.NAME, value);
    }

}

class IssuerClaim extends JwtEntry {

    static get NAME() { return "iss"; }

    /**
     * 
     * @param {String} value 
     */
    constructor(value) {
        super(IssuerClaim.NAME, value);
    }

}

class JwtIdClaim extends JwtEntry {

    static get NAME() { return "jti"; }

    /**
     * 
     * @param {String} value 
     */
    constructor(value) {
        super(JwtIdClaim.NAME, value);
    }

}

class NotBeforeClaim extends JwtEntry {

    static get NAME() { return "nbf"; }

    /**
     * 
     * @param {String} value 
     */
    constructor(value) {
        super(NotBeforeClaim.NAME, value);
    }

}

class SubjectClaim extends JwtEntry {

    static get NAME() { return "sub"; }

    /**
     * 
     * @param {String} value 
     */
    constructor(value) {
        super(SubjectClaim.NAME, value);
    }

}

class IssuedAtClaim extends JwtEntry {

    static get NAME() { return "iat"; }

    /**
     * 
     * @param {String} value 
     */
    constructor(value) {
        super(IssuedAtClaim.NAME, value);
    }

}

class JwtBody {

    constructor(claimsObject = null) {

        /**
         * @type {SubjectClaim}
         */
        this.subject = this.asTypedClaim(claimsObject, SubjectClaim.NAME, SubjectClaim);

        /**
         * @type {IssuerClaim}
         */
        this.issuer = this.asTypedClaim(claimsObject, IssuerClaim.NAME, IssuerClaim);

        /**
         * @type {AudienceClaim}
         */
        this.audience = this.asTypedClaim(claimsObject, AudienceClaim.NAME, AudienceClaim);

        /**
         * @type {JwtIdClaim}
         */
        this.jwtId = this.asTypedClaim(claimsObject, JwtIdClaim.NAME, JwtIdClaim);

        /**
         * @type {ExpiryClaim}
         */
        this.expiry = this.asTypedClaim(claimsObject, ExpiryClaim.NAME, ExpiryClaim);

        /**
         * @type {NotBeforeClaim}
         */
        this.notBefore = this.asTypedClaim(claimsObject, NotBeforeClaim.NAME, NotBeforeClaim);

        /**
         * @type {NotBeforeClaim}
         */
        this.issuedAt = this.asTypedClaim(claimsObject, IssuedAtClaim.NAME, NotBeforeClaim);

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
    asTypedClaim(claimsObject, attributeName, className) {
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
        const namedClaims = new coreutil_v1.Map();
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

class AlgorithmMeta extends JwtEntry {

    static get NAME() { return "alg"; }

    /**
     * 
     * @param {String} value 
     */
    constructor(value) {
        super(AlgorithmMeta.NAME, value);
    }

}

class TypeMeta extends JwtEntry {

    static get NAME() { return "typ"; }

    /**
     * 
     * @param {String} value 
     */
    constructor(value) {
        super(TypeMeta.NAME, value);
    }

}

class KeyIdMeta extends JwtEntry {

    static get NAME() { return "kid"; }

    /**
     * 
     * @param {String} value 
     */
    constructor(value) {
        super(KeyIdMeta.NAME, value);
    }

}

class JwtHeader {

    constructor(metaObject) {

        /**
         * @type {AlgorithmMeta}
         */
        this.algorithm = this.getMeta(metaObject, AlgorithmMeta.NAME, AlgorithmMeta);

        /**
         * @type {TypeMeta}
         */
        this.type = this.getMeta(metaObject, TypeMeta.NAME, TypeMeta);

        /**
         * @type {TypeMeta}
         */
         this.kid = this.getMeta(metaObject, KeyIdMeta.NAME, KeyIdMeta);
    }

    /**
     * 
     * @param {*} metaObject 
     * @param {*} attributeName 
     */
    getMeta(metaObject, attributeName, className) {
        if (metaObject === null) {
            return null;
        }
        const metaValue = metaObject[attributeName];
        if(metaValue === null || metaValue === undefined) {
            return null;
        }
        return new className(metaValue);
    }

}

class Jwt {

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

class JwtStringParser {

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

exports.AlgorithmMeta = AlgorithmMeta;
exports.AudienceClaim = AudienceClaim;
exports.ExpiryClaim = ExpiryClaim;
exports.IssuedAtClaim = IssuedAtClaim;
exports.IssuerClaim = IssuerClaim;
exports.Jwt = Jwt;
exports.JwtBody = JwtBody;
exports.JwtEntry = JwtEntry;
exports.JwtHeader = JwtHeader;
exports.JwtIdClaim = JwtIdClaim;
exports.JwtStringParser = JwtStringParser;
exports.KeyIdMeta = KeyIdMeta;
exports.NotBeforeClaim = NotBeforeClaim;
exports.SubjectClaim = SubjectClaim;
exports.TypeMeta = TypeMeta;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiand0cGFyc2VyX3YxLmpzIiwic291cmNlcyI6WyIuLi8uLi9zcmMvand0cGFyc2VyL21vZGVsL2p3dEVudHJ5LmpzIiwiLi4vLi4vc3JjL2p3dHBhcnNlci9tb2RlbC9ib2R5L2F1ZGllbmNlQ2xhaW0uanMiLCIuLi8uLi9zcmMvand0cGFyc2VyL21vZGVsL2JvZHkvZXhwaXJ5Q2xhaW0uanMiLCIuLi8uLi9zcmMvand0cGFyc2VyL21vZGVsL2JvZHkvaXNzdWVyQ2xhaW0uanMiLCIuLi8uLi9zcmMvand0cGFyc2VyL21vZGVsL2JvZHkvand0SWRDbGFpbS5qcyIsIi4uLy4uL3NyYy9qd3RwYXJzZXIvbW9kZWwvYm9keS9ub3RCZWZvcmVDbGFpbS5qcyIsIi4uLy4uL3NyYy9qd3RwYXJzZXIvbW9kZWwvYm9keS9zdWJqZWN0Q2xhaW0uanMiLCIuLi8uLi9zcmMvand0cGFyc2VyL21vZGVsL2JvZHkvaXNzdWVkQXRDbGFpbS5qcyIsIi4uLy4uL3NyYy9qd3RwYXJzZXIvbW9kZWwvand0Qm9keS5qcyIsIi4uLy4uL3NyYy9qd3RwYXJzZXIvbW9kZWwvaGVhZGVyL2FsZ29yaXRobU1ldGEuanMiLCIuLi8uLi9zcmMvand0cGFyc2VyL21vZGVsL2hlYWRlci90eXBlTWV0YS5qcyIsIi4uLy4uL3NyYy9qd3RwYXJzZXIvbW9kZWwvaGVhZGVyL2tleUlkTWV0YS5qcyIsIi4uLy4uL3NyYy9qd3RwYXJzZXIvbW9kZWwvand0SGVhZGVyLmpzIiwiLi4vLi4vc3JjL2p3dHBhcnNlci9tb2RlbC9qd3QuanMiLCIuLi8uLi9zcmMvand0cGFyc2VyL2p3dFN0cmluZ1BhcnNlci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgSnd0RW50cnkge1xuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IG5hbWUgXG4gICAgICogQHBhcmFtIHthbnl9IHZhbHVlIFxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKG5hbWUsIHZhbHVlKSB7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEB0eXBlIHtTdHJpbmd9XG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAdHlwZSB7YW55fVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgIH1cblxufSIsImltcG9ydCB7IEp3dEVudHJ5IH0gZnJvbSBcIi4uL2p3dEVudHJ5LmpzXCI7XG5cbmV4cG9ydCBjbGFzcyBBdWRpZW5jZUNsYWltIGV4dGVuZHMgSnd0RW50cnkge1xuXG4gICAgc3RhdGljIGdldCBOQU1FKCkgeyByZXR1cm4gXCJhdWRcIjsgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHZhbHVlIFxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHZhbHVlKSB7XG4gICAgICAgIHN1cGVyKEF1ZGllbmNlQ2xhaW0uTkFNRSwgdmFsdWUpXG4gICAgfVxuXG59IiwiaW1wb3J0IHsgSnd0RW50cnkgfSBmcm9tIFwiLi4vand0RW50cnkuanNcIjtcblxuZXhwb3J0IGNsYXNzIEV4cGlyeUNsYWltIGV4dGVuZHMgSnd0RW50cnkge1xuXG4gICAgc3RhdGljIGdldCBOQU1FKCkgeyByZXR1cm4gXCJleHBcIjsgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHZhbHVlIFxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHZhbHVlKSB7XG4gICAgICAgIHN1cGVyKEV4cGlyeUNsYWltLk5BTUUsIHZhbHVlKVxuICAgIH1cblxufSIsImltcG9ydCB7IEp3dEVudHJ5IH0gZnJvbSBcIi4uL2p3dEVudHJ5LmpzXCI7XG5cbmV4cG9ydCBjbGFzcyBJc3N1ZXJDbGFpbSBleHRlbmRzIEp3dEVudHJ5IHtcblxuICAgIHN0YXRpYyBnZXQgTkFNRSgpIHsgcmV0dXJuIFwiaXNzXCI7IH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSB2YWx1ZSBcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcih2YWx1ZSkge1xuICAgICAgICBzdXBlcihJc3N1ZXJDbGFpbS5OQU1FLCB2YWx1ZSlcbiAgICB9XG5cbn0iLCJpbXBvcnQgeyBKd3RFbnRyeSB9IGZyb20gXCIuLi9qd3RFbnRyeS5qc1wiO1xuXG5leHBvcnQgY2xhc3MgSnd0SWRDbGFpbSBleHRlbmRzIEp3dEVudHJ5IHtcblxuICAgIHN0YXRpYyBnZXQgTkFNRSgpIHsgcmV0dXJuIFwianRpXCI7IH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSB2YWx1ZSBcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcih2YWx1ZSkge1xuICAgICAgICBzdXBlcihKd3RJZENsYWltLk5BTUUsIHZhbHVlKVxuICAgIH1cblxufSIsImltcG9ydCB7IEp3dEVudHJ5IH0gZnJvbSBcIi4uL2p3dEVudHJ5LmpzXCI7XG5cbmV4cG9ydCBjbGFzcyBOb3RCZWZvcmVDbGFpbSBleHRlbmRzIEp3dEVudHJ5IHtcblxuICAgIHN0YXRpYyBnZXQgTkFNRSgpIHsgcmV0dXJuIFwibmJmXCI7IH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSB2YWx1ZSBcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcih2YWx1ZSkge1xuICAgICAgICBzdXBlcihOb3RCZWZvcmVDbGFpbS5OQU1FLCB2YWx1ZSlcbiAgICB9XG5cbn0iLCJpbXBvcnQgeyBKd3RFbnRyeSB9IGZyb20gXCIuLi9qd3RFbnRyeS5qc1wiO1xuXG5leHBvcnQgY2xhc3MgU3ViamVjdENsYWltIGV4dGVuZHMgSnd0RW50cnkge1xuXG4gICAgc3RhdGljIGdldCBOQU1FKCkgeyByZXR1cm4gXCJzdWJcIjsgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHZhbHVlIFxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHZhbHVlKSB7XG4gICAgICAgIHN1cGVyKFN1YmplY3RDbGFpbS5OQU1FLCB2YWx1ZSlcbiAgICB9XG5cbn0iLCJpbXBvcnQgeyBKd3RFbnRyeSB9IGZyb20gXCIuLi9qd3RFbnRyeS5qc1wiO1xuXG5leHBvcnQgY2xhc3MgSXNzdWVkQXRDbGFpbSBleHRlbmRzIEp3dEVudHJ5IHtcblxuICAgIHN0YXRpYyBnZXQgTkFNRSgpIHsgcmV0dXJuIFwiaWF0XCI7IH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSB2YWx1ZSBcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcih2YWx1ZSkge1xuICAgICAgICBzdXBlcihJc3N1ZWRBdENsYWltLk5BTUUsIHZhbHVlKVxuICAgIH1cblxufSIsImltcG9ydCB7IE1hcCB9IGZyb20gXCJjb3JldXRpbF92MVwiXG5pbXBvcnQgeyBBdWRpZW5jZUNsYWltIH0gZnJvbSBcIi4vYm9keS9hdWRpZW5jZUNsYWltLmpzXCI7XG5pbXBvcnQgeyBKd3RFbnRyeSB9IGZyb20gXCIuL2p3dEVudHJ5LmpzXCI7XG5pbXBvcnQgeyBFeHBpcnlDbGFpbSB9IGZyb20gXCIuL2JvZHkvZXhwaXJ5Q2xhaW0uanNcIjtcbmltcG9ydCB7IElzc3VlckNsYWltIH0gZnJvbSBcIi4vYm9keS9pc3N1ZXJDbGFpbS5qc1wiO1xuaW1wb3J0IHsgSnd0SWRDbGFpbSB9IGZyb20gXCIuL2JvZHkvand0SWRDbGFpbS5qc1wiO1xuaW1wb3J0IHsgTm90QmVmb3JlQ2xhaW0gfSBmcm9tIFwiLi9ib2R5L25vdEJlZm9yZUNsYWltLmpzXCI7XG5pbXBvcnQgeyBTdWJqZWN0Q2xhaW0gfSBmcm9tIFwiLi9ib2R5L3N1YmplY3RDbGFpbS5qc1wiO1xuaW1wb3J0IHsgSXNzdWVkQXRDbGFpbSB9IGZyb20gXCIuL2JvZHkvaXNzdWVkQXRDbGFpbS5qc1wiO1xuXG5cbmV4cG9ydCBjbGFzcyBKd3RCb2R5IHtcblxuICAgIGNvbnN0cnVjdG9yKGNsYWltc09iamVjdCA9IG51bGwpIHtcblxuICAgICAgICAvKipcbiAgICAgICAgICogQHR5cGUge1N1YmplY3RDbGFpbX1cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuc3ViamVjdCA9IHRoaXMuYXNUeXBlZENsYWltKGNsYWltc09iamVjdCwgU3ViamVjdENsYWltLk5BTUUsIFN1YmplY3RDbGFpbSk7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEB0eXBlIHtJc3N1ZXJDbGFpbX1cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuaXNzdWVyID0gdGhpcy5hc1R5cGVkQ2xhaW0oY2xhaW1zT2JqZWN0LCBJc3N1ZXJDbGFpbS5OQU1FLCBJc3N1ZXJDbGFpbSk7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEB0eXBlIHtBdWRpZW5jZUNsYWltfVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5hdWRpZW5jZSA9IHRoaXMuYXNUeXBlZENsYWltKGNsYWltc09iamVjdCwgQXVkaWVuY2VDbGFpbS5OQU1FLCBBdWRpZW5jZUNsYWltKTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogQHR5cGUge0p3dElkQ2xhaW19XG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmp3dElkID0gdGhpcy5hc1R5cGVkQ2xhaW0oY2xhaW1zT2JqZWN0LCBKd3RJZENsYWltLk5BTUUsIEp3dElkQ2xhaW0pO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAdHlwZSB7RXhwaXJ5Q2xhaW19XG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmV4cGlyeSA9IHRoaXMuYXNUeXBlZENsYWltKGNsYWltc09iamVjdCwgRXhwaXJ5Q2xhaW0uTkFNRSwgRXhwaXJ5Q2xhaW0pO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAdHlwZSB7Tm90QmVmb3JlQ2xhaW19XG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLm5vdEJlZm9yZSA9IHRoaXMuYXNUeXBlZENsYWltKGNsYWltc09iamVjdCwgTm90QmVmb3JlQ2xhaW0uTkFNRSwgTm90QmVmb3JlQ2xhaW0pO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAdHlwZSB7Tm90QmVmb3JlQ2xhaW19XG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmlzc3VlZEF0ID0gdGhpcy5hc1R5cGVkQ2xhaW0oY2xhaW1zT2JqZWN0LCBJc3N1ZWRBdENsYWltLk5BTUUsIE5vdEJlZm9yZUNsYWltKTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogQHR5cGUge01hcH1cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMubmFtZWRDbGFpbXMgPSB0aGlzLmFzTWFwKGNsYWltc09iamVjdCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHsqfSBjbGFpbXNPYmplY3QgXG4gICAgICogQHBhcmFtIHsqfSBhdHRyaWJ1dGVOYW1lIFxuICAgICAqIEByZXR1cm5zIHsqfVxuICAgICAqL1xuICAgIGFzVHlwZWRDbGFpbShjbGFpbXNPYmplY3QsIGF0dHJpYnV0ZU5hbWUsIGNsYXNzTmFtZSkge1xuICAgICAgICBpZiAoY2xhaW1zT2JqZWN0ID09PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBjbGFpbXNWYWx1ZSA9IGNsYWltc09iamVjdFthdHRyaWJ1dGVOYW1lXTtcbiAgICAgICAgaWYoY2xhaW1zVmFsdWUgPT09IG51bGwgfHwgY2xhaW1zVmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ldyBjbGFzc05hbWUoY2xhaW1zVmFsdWUpO1xuICAgIH1cblxuICAgIGFzTWFwKGNsYWltc09iamVjdCkge1xuICAgICAgICBjb25zdCBuYW1lZENsYWltcyA9IG5ldyBNYXAoKTtcbiAgICAgICAgaWYgKGNsYWltc09iamVjdCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIG5hbWVkQ2xhaW1zO1xuICAgICAgICB9XG4gICAgICAgIGZvciAoIGNvbnN0IFtrZXksIHZhbHVlXSBvZiBPYmplY3QuZW50cmllcyhjbGFpbXNPYmplY3QpKSB7XG4gICAgICAgICAgICBuYW1lZENsYWltcy5zZXQoa2V5LCBuZXcgSnd0RW50cnkoa2V5LCB2YWx1ZSkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuYW1lZENsYWltcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gbmFtZSBcbiAgICAgKiBAcmV0dXJucyB7Snd0RW50cnl9XG4gICAgICovXG4gICAgZ2V0TmFtZWRDbGFpbShuYW1lKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm5hbWVkQ2xhaW1zLmdldChuYW1lKTtcbiAgICB9XG5cbn0iLCJpbXBvcnQgeyBKd3RFbnRyeSB9IGZyb20gXCIuLi9qd3RFbnRyeS5qc1wiO1xuXG5leHBvcnQgY2xhc3MgQWxnb3JpdGhtTWV0YSBleHRlbmRzIEp3dEVudHJ5IHtcblxuICAgIHN0YXRpYyBnZXQgTkFNRSgpIHsgcmV0dXJuIFwiYWxnXCI7IH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSB2YWx1ZSBcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcih2YWx1ZSkge1xuICAgICAgICBzdXBlcihBbGdvcml0aG1NZXRhLk5BTUUsIHZhbHVlKVxuICAgIH1cblxufSIsImltcG9ydCB7IEp3dEVudHJ5IH0gZnJvbSBcIi4uL2p3dEVudHJ5LmpzXCI7XG5cbmV4cG9ydCBjbGFzcyBUeXBlTWV0YSBleHRlbmRzIEp3dEVudHJ5IHtcblxuICAgIHN0YXRpYyBnZXQgTkFNRSgpIHsgcmV0dXJuIFwidHlwXCI7IH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSB2YWx1ZSBcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcih2YWx1ZSkge1xuICAgICAgICBzdXBlcihUeXBlTWV0YS5OQU1FLCB2YWx1ZSlcbiAgICB9XG5cbn0iLCJpbXBvcnQgeyBKd3RFbnRyeSB9IGZyb20gXCIuLi9qd3RFbnRyeS5qc1wiO1xuXG5leHBvcnQgY2xhc3MgS2V5SWRNZXRhIGV4dGVuZHMgSnd0RW50cnkge1xuXG4gICAgc3RhdGljIGdldCBOQU1FKCkgeyByZXR1cm4gXCJraWRcIjsgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHZhbHVlIFxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHZhbHVlKSB7XG4gICAgICAgIHN1cGVyKEtleUlkTWV0YS5OQU1FLCB2YWx1ZSlcbiAgICB9XG5cbn0iLCJpbXBvcnQgeyBBbGdvcml0aG1NZXRhIH0gZnJvbSBcIi4vaGVhZGVyL2FsZ29yaXRobU1ldGEuanNcIjtcbmltcG9ydCB7IFR5cGVNZXRhIH0gZnJvbSBcIi4vaGVhZGVyL3R5cGVNZXRhLmpzXCI7XG5pbXBvcnQgeyBLZXlJZE1ldGEgfSBmcm9tIFwiLi9oZWFkZXIva2V5SWRNZXRhLmpzXCI7XG5cbmV4cG9ydCBjbGFzcyBKd3RIZWFkZXIge1xuXG4gICAgY29uc3RydWN0b3IobWV0YU9iamVjdCkge1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAdHlwZSB7QWxnb3JpdGhtTWV0YX1cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuYWxnb3JpdGhtID0gdGhpcy5nZXRNZXRhKG1ldGFPYmplY3QsIEFsZ29yaXRobU1ldGEuTkFNRSwgQWxnb3JpdGhtTWV0YSk7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEB0eXBlIHtUeXBlTWV0YX1cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMudHlwZSA9IHRoaXMuZ2V0TWV0YShtZXRhT2JqZWN0LCBUeXBlTWV0YS5OQU1FLCBUeXBlTWV0YSk7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEB0eXBlIHtUeXBlTWV0YX1cbiAgICAgICAgICovXG4gICAgICAgICB0aGlzLmtpZCA9IHRoaXMuZ2V0TWV0YShtZXRhT2JqZWN0LCBLZXlJZE1ldGEuTkFNRSwgS2V5SWRNZXRhKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0geyp9IG1ldGFPYmplY3QgXG4gICAgICogQHBhcmFtIHsqfSBhdHRyaWJ1dGVOYW1lIFxuICAgICAqL1xuICAgIGdldE1ldGEobWV0YU9iamVjdCwgYXR0cmlidXRlTmFtZSwgY2xhc3NOYW1lKSB7XG4gICAgICAgIGlmIChtZXRhT2JqZWN0ID09PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBtZXRhVmFsdWUgPSBtZXRhT2JqZWN0W2F0dHJpYnV0ZU5hbWVdO1xuICAgICAgICBpZihtZXRhVmFsdWUgPT09IG51bGwgfHwgbWV0YVZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXcgY2xhc3NOYW1lKG1ldGFWYWx1ZSk7XG4gICAgfVxuXG59IiwiaW1wb3J0IHsgSnd0Qm9keSB9IGZyb20gXCIuL2p3dEJvZHkuanNcIjtcbmltcG9ydCB7IEp3dEhlYWRlciB9IGZyb20gXCIuL2p3dEhlYWRlci5qc1wiO1xuXG5leHBvcnQgY2xhc3MgSnd0IHtcblxuICAgIGNvbnN0cnVjdG9yKHN0cmluZ1NvdXJjZSwgand0SGVhZGVyLCBqd3RCb2R5KSB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAdHlwZSB7U3RyaW5nfVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5zb3VyY2UgPSBzdHJpbmdTb3VyY2U7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEB0eXBlIHtKd3RIZWFkZXJ9XG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmhlYWRlciA9IGp3dEhlYWRlcjtcblxuICAgICAgICAvKipcbiAgICAgICAgICogQHR5cGUge0p3dEJvZHl9XG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmJvZHkgPSBqd3RCb2R5O1xuICAgIH1cblxufSIsImltcG9ydCB7IEp3dCB9IGZyb20gXCIuL21vZGVsL2p3dC5qc1wiO1xuaW1wb3J0IHsgSnd0Qm9keSB9IGZyb20gXCIuL21vZGVsL2p3dEJvZHkuanNcIjtcbmltcG9ydCB7IEp3dEhlYWRlciB9IGZyb20gXCIuL21vZGVsL2p3dEhlYWRlci5qc1wiO1xuXG5leHBvcnQgY2xhc3MgSnd0U3RyaW5nUGFyc2VyIHtcblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBqd3RTdHJpbmdcbiAgICAgKiBAcmV0dXJucyB7Snd0fSBqd3RcbiAgICAgKi9cbiAgICBzdGF0aWMgcGFyc2VTdHJpbmcoand0U3RyaW5nKSB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAdHlwZSBbQXJyYXldXG4gICAgICAgICAqL1xuICAgICAgICBjb25zdCBqd3RQYXJ0cyA9IGp3dFN0cmluZy5zcGxpdChcIi5cIik7XG4gICAgICAgIGlmKGp3dFBhcnRzLmxlbmd0aCA8IDIpIHtcbiAgICAgICAgICAgIHRocm93IFwiSldUIGRvZXMgbm90IGhhdmUgYSBib2R5XCI7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGNvbnN0IGhlYWRlckRlY29kZWQgPSBhdG9iKGp3dFBhcnRzWzBdKTtcbiAgICAgICAgY29uc3QgaGVhZGVyT2JqZWN0ID0gSlNPTi5wYXJzZShoZWFkZXJEZWNvZGVkKTtcbiAgICAgICAgY29uc3Qgand0SGVhZGVyID0gbmV3IEp3dEhlYWRlcihoZWFkZXJPYmplY3QpO1xuXG4gICAgICAgIGNvbnN0IGJvZHlEZWNvZGVkID0gYXRvYihqd3RQYXJ0c1sxXSk7XG4gICAgICAgIGNvbnN0IGJvZHlPYmplY3QgPSBKU09OLnBhcnNlKGJvZHlEZWNvZGVkKTtcbiAgICAgICAgY29uc3Qgand0Qm9keSA9IG5ldyBKd3RCb2R5KGJvZHlPYmplY3QpO1xuXG4gICAgICAgIHJldHVybiBuZXcgSnd0KGp3dFN0cmluZywgand0SGVhZGVyLCBqd3RCb2R5KTtcbiAgICB9XG5cbn0iXSwibmFtZXMiOlsiTWFwIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFB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QUFFO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsWUFBWSxFQUFFLFlBQVksQ0FBQyxJQUFJLEVBQUUsWUFBWSxDQUFDLENBQUM7QUFDeEY7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLEVBQUUsV0FBVyxDQUFDLElBQUksRUFBRSxXQUFXLENBQUMsQ0FBQztBQUNyRjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLFlBQVksRUFBRSxhQUFhLENBQUMsSUFBSSxFQUFFLGFBQWEsQ0FBQyxDQUFDO0FBQzNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsWUFBWSxFQUFFLFVBQVUsQ0FBQyxJQUFJLEVBQUUsVUFBVSxDQUFDLENBQUM7QUFDbEY7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLEVBQUUsV0FBVyxDQUFDLElBQUksRUFBRSxXQUFXLENBQUMsQ0FBQztBQUNyRjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLFlBQVksRUFBRSxjQUFjLENBQUMsSUFBSSxFQUFFLGNBQWMsQ0FBQyxDQUFDO0FBQzlGO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsWUFBWSxFQUFFLGFBQWEsQ0FBQyxJQUFJLEVBQUUsY0FBYyxDQUFDLENBQUM7QUFDNUY7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FB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
