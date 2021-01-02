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
exports.NotBeforeClaim = NotBeforeClaim;
exports.SubjectClaim = SubjectClaim;
exports.TypeMeta = TypeMeta;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiand0cGFyc2VyX3YxLmpzIiwic291cmNlcyI6WyIuLi8uLi9zcmMvand0cGFyc2VyL21vZGVsL2p3dEVudHJ5LmpzIiwiLi4vLi4vc3JjL2p3dHBhcnNlci9tb2RlbC9ib2R5L2F1ZGllbmNlQ2xhaW0uanMiLCIuLi8uLi9zcmMvand0cGFyc2VyL21vZGVsL2JvZHkvZXhwaXJ5Q2xhaW0uanMiLCIuLi8uLi9zcmMvand0cGFyc2VyL21vZGVsL2JvZHkvaXNzdWVyQ2xhaW0uanMiLCIuLi8uLi9zcmMvand0cGFyc2VyL21vZGVsL2JvZHkvand0SWRDbGFpbS5qcyIsIi4uLy4uL3NyYy9qd3RwYXJzZXIvbW9kZWwvYm9keS9ub3RCZWZvcmVDbGFpbS5qcyIsIi4uLy4uL3NyYy9qd3RwYXJzZXIvbW9kZWwvYm9keS9zdWJqZWN0Q2xhaW0uanMiLCIuLi8uLi9zcmMvand0cGFyc2VyL21vZGVsL2JvZHkvaXNzdWVkQXRDbGFpbS5qcyIsIi4uLy4uL3NyYy9qd3RwYXJzZXIvbW9kZWwvand0Qm9keS5qcyIsIi4uLy4uL3NyYy9qd3RwYXJzZXIvbW9kZWwvaGVhZGVyL2FsZ29yaXRobU1ldGEuanMiLCIuLi8uLi9zcmMvand0cGFyc2VyL21vZGVsL2hlYWRlci90eXBlTWV0YS5qcyIsIi4uLy4uL3NyYy9qd3RwYXJzZXIvbW9kZWwvand0SGVhZGVyLmpzIiwiLi4vLi4vc3JjL2p3dHBhcnNlci9tb2RlbC9qd3QuanMiLCIuLi8uLi9zcmMvand0cGFyc2VyL2p3dFN0cmluZ1BhcnNlci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgSnd0RW50cnkge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gbmFtZSBcclxuICAgICAqIEBwYXJhbSB7YW55fSB2YWx1ZSBcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IobmFtZSwgdmFsdWUpIHtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQHR5cGUge1N0cmluZ31cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBAdHlwZSB7YW55fVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbn0iLCJpbXBvcnQgeyBKd3RFbnRyeSB9IGZyb20gXCIuLi9qd3RFbnRyeS5qc1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEF1ZGllbmNlQ2xhaW0gZXh0ZW5kcyBKd3RFbnRyeSB7XHJcblxyXG4gICAgc3RhdGljIGdldCBOQU1FKCkgeyByZXR1cm4gXCJhdWRcIjsgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gdmFsdWUgXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHZhbHVlKSB7XHJcbiAgICAgICAgc3VwZXIoQXVkaWVuY2VDbGFpbS5OQU1FLCB2YWx1ZSlcclxuICAgIH1cclxuXHJcbn0iLCJpbXBvcnQgeyBKd3RFbnRyeSB9IGZyb20gXCIuLi9qd3RFbnRyeS5qc1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEV4cGlyeUNsYWltIGV4dGVuZHMgSnd0RW50cnkge1xyXG5cclxuICAgIHN0YXRpYyBnZXQgTkFNRSgpIHsgcmV0dXJuIFwiZXhwXCI7IH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHZhbHVlIFxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3Rvcih2YWx1ZSkge1xyXG4gICAgICAgIHN1cGVyKEV4cGlyeUNsYWltLk5BTUUsIHZhbHVlKVxyXG4gICAgfVxyXG5cclxufSIsImltcG9ydCB7IEp3dEVudHJ5IH0gZnJvbSBcIi4uL2p3dEVudHJ5LmpzXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgSXNzdWVyQ2xhaW0gZXh0ZW5kcyBKd3RFbnRyeSB7XHJcblxyXG4gICAgc3RhdGljIGdldCBOQU1FKCkgeyByZXR1cm4gXCJpc3NcIjsgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gdmFsdWUgXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHZhbHVlKSB7XHJcbiAgICAgICAgc3VwZXIoSXNzdWVyQ2xhaW0uTkFNRSwgdmFsdWUpXHJcbiAgICB9XHJcblxyXG59IiwiaW1wb3J0IHsgSnd0RW50cnkgfSBmcm9tIFwiLi4vand0RW50cnkuanNcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBKd3RJZENsYWltIGV4dGVuZHMgSnd0RW50cnkge1xyXG5cclxuICAgIHN0YXRpYyBnZXQgTkFNRSgpIHsgcmV0dXJuIFwianRpXCI7IH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHZhbHVlIFxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3Rvcih2YWx1ZSkge1xyXG4gICAgICAgIHN1cGVyKEp3dElkQ2xhaW0uTkFNRSwgdmFsdWUpXHJcbiAgICB9XHJcblxyXG59IiwiaW1wb3J0IHsgSnd0RW50cnkgfSBmcm9tIFwiLi4vand0RW50cnkuanNcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBOb3RCZWZvcmVDbGFpbSBleHRlbmRzIEp3dEVudHJ5IHtcclxuXHJcbiAgICBzdGF0aWMgZ2V0IE5BTUUoKSB7IHJldHVybiBcIm5iZlwiOyB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSB2YWx1ZSBcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IodmFsdWUpIHtcclxuICAgICAgICBzdXBlcihOb3RCZWZvcmVDbGFpbS5OQU1FLCB2YWx1ZSlcclxuICAgIH1cclxuXHJcbn0iLCJpbXBvcnQgeyBKd3RFbnRyeSB9IGZyb20gXCIuLi9qd3RFbnRyeS5qc1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFN1YmplY3RDbGFpbSBleHRlbmRzIEp3dEVudHJ5IHtcclxuXHJcbiAgICBzdGF0aWMgZ2V0IE5BTUUoKSB7IHJldHVybiBcInN1YlwiOyB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSB2YWx1ZSBcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IodmFsdWUpIHtcclxuICAgICAgICBzdXBlcihTdWJqZWN0Q2xhaW0uTkFNRSwgdmFsdWUpXHJcbiAgICB9XHJcblxyXG59IiwiaW1wb3J0IHsgSnd0RW50cnkgfSBmcm9tIFwiLi4vand0RW50cnkuanNcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBJc3N1ZWRBdENsYWltIGV4dGVuZHMgSnd0RW50cnkge1xyXG5cclxuICAgIHN0YXRpYyBnZXQgTkFNRSgpIHsgcmV0dXJuIFwiaWF0XCI7IH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHZhbHVlIFxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3Rvcih2YWx1ZSkge1xyXG4gICAgICAgIHN1cGVyKElzc3VlZEF0Q2xhaW0uTkFNRSwgdmFsdWUpXHJcbiAgICB9XHJcblxyXG59IiwiaW1wb3J0IHsgTWFwIH0gZnJvbSBcImNvcmV1dGlsX3YxXCJcclxuaW1wb3J0IHsgQXVkaWVuY2VDbGFpbSB9IGZyb20gXCIuL2JvZHkvYXVkaWVuY2VDbGFpbS5qc1wiO1xyXG5pbXBvcnQgeyBKd3RFbnRyeSB9IGZyb20gXCIuL2p3dEVudHJ5LmpzXCI7XHJcbmltcG9ydCB7IEV4cGlyeUNsYWltIH0gZnJvbSBcIi4vYm9keS9leHBpcnlDbGFpbS5qc1wiO1xyXG5pbXBvcnQgeyBJc3N1ZXJDbGFpbSB9IGZyb20gXCIuL2JvZHkvaXNzdWVyQ2xhaW0uanNcIjtcclxuaW1wb3J0IHsgSnd0SWRDbGFpbSB9IGZyb20gXCIuL2JvZHkvand0SWRDbGFpbS5qc1wiO1xyXG5pbXBvcnQgeyBOb3RCZWZvcmVDbGFpbSB9IGZyb20gXCIuL2JvZHkvbm90QmVmb3JlQ2xhaW0uanNcIjtcclxuaW1wb3J0IHsgU3ViamVjdENsYWltIH0gZnJvbSBcIi4vYm9keS9zdWJqZWN0Q2xhaW0uanNcIjtcclxuaW1wb3J0IHsgSXNzdWVkQXRDbGFpbSB9IGZyb20gXCIuL2JvZHkvaXNzdWVkQXRDbGFpbS5qc1wiO1xyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBKd3RCb2R5IHtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihjbGFpbXNPYmplY3QgPSBudWxsKSB7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEB0eXBlIHtTdWJqZWN0Q2xhaW19XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5zdWJqZWN0ID0gdGhpcy5nZXRDbGFpbShjbGFpbXNPYmplY3QsIFN1YmplY3RDbGFpbS5OQU1FLCBTdWJqZWN0Q2xhaW0pO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBAdHlwZSB7SXNzdWVyQ2xhaW19XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5pc3N1ZXIgPSB0aGlzLmdldENsYWltKGNsYWltc09iamVjdCwgSXNzdWVyQ2xhaW0uTkFNRSwgSXNzdWVyQ2xhaW0pO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBAdHlwZSB7QXVkaWVuY2VDbGFpbX1cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLmF1ZGllbmNlID0gdGhpcy5nZXRDbGFpbShjbGFpbXNPYmplY3QsIEF1ZGllbmNlQ2xhaW0uTkFNRSwgQXVkaWVuY2VDbGFpbSk7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEB0eXBlIHtKd3RJZENsYWltfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuand0SWQgPSB0aGlzLmdldENsYWltKGNsYWltc09iamVjdCwgSnd0SWRDbGFpbS5OQU1FLCBKd3RJZENsYWltKTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQHR5cGUge0V4cGlyeUNsYWltfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuZXhwaXJ5ID0gdGhpcy5nZXRDbGFpbShjbGFpbXNPYmplY3QsIEV4cGlyeUNsYWltLk5BTUUsIEV4cGlyeUNsYWltKTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQHR5cGUge05vdEJlZm9yZUNsYWltfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMubm90QmVmb3JlID0gdGhpcy5nZXRDbGFpbShjbGFpbXNPYmplY3QsIE5vdEJlZm9yZUNsYWltLk5BTUUsIE5vdEJlZm9yZUNsYWltKTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQHR5cGUge05vdEJlZm9yZUNsYWltfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuaXNzdWVkQXQgPSB0aGlzLmdldENsYWltKGNsYWltc09iamVjdCwgSXNzdWVkQXRDbGFpbS5OQU1FLCBOb3RCZWZvcmVDbGFpbSk7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEB0eXBlIHtNYXB9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5uYW1lZENsYWltcyA9IHRoaXMuYXNNYXAoY2xhaW1zT2JqZWN0KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHsqfSBjbGFpbXNPYmplY3QgXHJcbiAgICAgKiBAcGFyYW0geyp9IGF0dHJpYnV0ZU5hbWUgXHJcbiAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAqL1xyXG4gICAgZ2V0Q2xhaW0oY2xhaW1zT2JqZWN0LCBhdHRyaWJ1dGVOYW1lLCBjbGFzc05hbWUpIHtcclxuICAgICAgICBpZiAoY2xhaW1zT2JqZWN0ID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBjbGFpbXNWYWx1ZSA9IGNsYWltc09iamVjdFthdHRyaWJ1dGVOYW1lXTtcclxuICAgICAgICBpZihjbGFpbXNWYWx1ZSA9PT0gbnVsbCB8fCBjbGFpbXNWYWx1ZSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbmV3IGNsYXNzTmFtZShjbGFpbXNWYWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgYXNNYXAoY2xhaW1zT2JqZWN0KSB7XHJcbiAgICAgICAgY29uc3QgbmFtZWRDbGFpbXMgPSBuZXcgTWFwKCk7XHJcbiAgICAgICAgaWYgKGNsYWltc09iamVjdCA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbmFtZWRDbGFpbXM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAoIGNvbnN0IFtrZXksIHZhbHVlXSBvZiBPYmplY3QuZW50cmllcyhjbGFpbXNPYmplY3QpKSB7XHJcbiAgICAgICAgICAgIG5hbWVkQ2xhaW1zLnNldChrZXksIG5ldyBKd3RFbnRyeShrZXksIHZhbHVlKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBuYW1lZENsYWltcztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IG5hbWUgXHJcbiAgICAgKiBAcmV0dXJucyB7Snd0RW50cnl9XHJcbiAgICAgKi9cclxuICAgIGdldE5hbWVkQ2xhaW0obmFtZSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm5hbWVkQ2xhaW1zLmdldChuYW1lKTtcclxuICAgIH1cclxuXHJcbn0iLCJpbXBvcnQgeyBKd3RFbnRyeSB9IGZyb20gXCIuLi9qd3RFbnRyeS5qc1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEFsZ29yaXRobU1ldGEgZXh0ZW5kcyBKd3RFbnRyeSB7XHJcblxyXG4gICAgc3RhdGljIGdldCBOQU1FKCkgeyByZXR1cm4gXCJhbGdcIjsgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gdmFsdWUgXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHZhbHVlKSB7XHJcbiAgICAgICAgc3VwZXIoQWxnb3JpdGhtTWV0YS5OQU1FLCB2YWx1ZSlcclxuICAgIH1cclxuXHJcbn0iLCJpbXBvcnQgeyBKd3RFbnRyeSB9IGZyb20gXCIuLi9qd3RFbnRyeS5qc1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFR5cGVNZXRhIGV4dGVuZHMgSnd0RW50cnkge1xyXG5cclxuICAgIHN0YXRpYyBnZXQgTkFNRSgpIHsgcmV0dXJuIFwidHlwXCI7IH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHZhbHVlIFxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3Rvcih2YWx1ZSkge1xyXG4gICAgICAgIHN1cGVyKFR5cGVNZXRhLk5BTUUsIHZhbHVlKVxyXG4gICAgfVxyXG5cclxufSIsImltcG9ydCB7IEFsZ29yaXRobU1ldGEgfSBmcm9tIFwiLi9oZWFkZXIvYWxnb3JpdGhtTWV0YS5qc1wiO1xyXG5pbXBvcnQgeyBUeXBlTWV0YSB9IGZyb20gXCIuL2hlYWRlci90eXBlTWV0YS5qc1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEp3dEhlYWRlciB7XHJcblxyXG4gICAgY29uc3RydWN0b3IobWV0YU9iamVjdCkge1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBAdHlwZSB7QWxnb3JpdGhtTWV0YX1cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLmFsZ29yaXRobSA9IHRoaXMuZ2V0TWV0YShtZXRhT2JqZWN0LCBBbGdvcml0aG1NZXRhLk5BTUUsIEFsZ29yaXRobU1ldGEpO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBAdHlwZSB7VHlwZU1ldGF9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy50eXBlID0gdGhpcy5nZXRNZXRhKG1ldGFPYmplY3QsIFR5cGVNZXRhLk5BTUUsIFR5cGVNZXRhKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHsqfSBtZXRhT2JqZWN0IFxyXG4gICAgICogQHBhcmFtIHsqfSBhdHRyaWJ1dGVOYW1lIFxyXG4gICAgICovXHJcbiAgICBnZXRNZXRhKG1ldGFPYmplY3QsIGF0dHJpYnV0ZU5hbWUsIGNsYXNzTmFtZSkge1xyXG4gICAgICAgIGlmIChtZXRhT2JqZWN0ID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBtZXRhVmFsdWUgPSBtZXRhT2JqZWN0W2F0dHJpYnV0ZU5hbWVdO1xyXG4gICAgICAgIGlmKG1ldGFWYWx1ZSA9PT0gbnVsbCB8fCBtZXRhVmFsdWUgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG5ldyBjbGFzc05hbWUobWV0YVZhbHVlKTtcclxuICAgIH1cclxuXHJcbn0iLCJpbXBvcnQgeyBKd3RCb2R5IH0gZnJvbSBcIi4vand0Qm9keS5qc1wiO1xyXG5pbXBvcnQgeyBKd3RIZWFkZXIgfSBmcm9tIFwiLi9qd3RIZWFkZXIuanNcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBKd3Qge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHN0cmluZ1NvdXJjZSwgand0SGVhZGVyLCBqd3RCb2R5KSB7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQHR5cGUge1N0cmluZ31cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLnNvdXJjZSA9IHN0cmluZ1NvdXJjZTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQHR5cGUge0p3dEhlYWRlcn1cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLmhlYWRlciA9IGp3dEhlYWRlcjtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQHR5cGUge0p3dEJvZHl9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5ib2R5ID0gand0Qm9keTtcclxuICAgIH1cclxuXHJcbn0iLCJpbXBvcnQgeyBKd3QgfSBmcm9tIFwiLi9tb2RlbC9qd3QuanNcIjtcclxuaW1wb3J0IHsgSnd0Qm9keSB9IGZyb20gXCIuL21vZGVsL2p3dEJvZHkuanNcIjtcclxuaW1wb3J0IHsgSnd0SGVhZGVyIH0gZnJvbSBcIi4vbW9kZWwvand0SGVhZGVyLmpzXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgSnd0U3RyaW5nUGFyc2VyIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGp3dFN0cmluZ1xyXG4gICAgICogQHJldHVybnMge0p3dH0gand0XHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBwYXJzZVN0cmluZyhqd3RTdHJpbmcpIHtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBAdHlwZSBbQXJyYXldXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgY29uc3Qgand0UGFydHMgPSBqd3RTdHJpbmcuc3BsaXQoXCIuXCIpO1xyXG4gICAgICAgIGlmKGp3dFBhcnRzLmxlbmd0aCA8IDIpIHtcclxuICAgICAgICAgICAgdGhyb3cgXCJKV1QgZG9lcyBub3QgaGF2ZSBhIGJvZHlcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgY29uc3QgaGVhZGVyRGVjb2RlZCA9IGF0b2Ioand0UGFydHNbMF0pO1xyXG4gICAgICAgIGNvbnN0IGhlYWRlck9iamVjdCA9IEpTT04ucGFyc2UoaGVhZGVyRGVjb2RlZCk7XHJcbiAgICAgICAgY29uc3Qgand0SGVhZGVyID0gbmV3IEp3dEhlYWRlcihoZWFkZXJPYmplY3QpO1xyXG5cclxuICAgICAgICBjb25zdCBib2R5RGVjb2RlZCA9IGF0b2Ioand0UGFydHNbMV0pO1xyXG4gICAgICAgIGNvbnN0IGJvZHlPYmplY3QgPSBKU09OLnBhcnNlKGJvZHlEZWNvZGVkKTtcclxuICAgICAgICBjb25zdCBqd3RCb2R5ID0gbmV3IEp3dEJvZHkoYm9keU9iamVjdCk7XHJcblxyXG4gICAgICAgIHJldHVybiBuZXcgSnd0KGp3dFN0cmluZywgand0SGVhZGVyLCBqd3RCb2R5KTtcclxuICAgIH1cclxuXHJcbn0iXSwibmFtZXMiOlsiTWFwIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBTyxNQUFNLFFBQVEsQ0FBQztBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLFdBQVcsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7QUFDM0IsS0FBSztBQUNMO0FBQ0E7O0FDbEJPLE1BQU0sYUFBYSxTQUFTLFFBQVEsQ0FBQztBQUM1QztBQUNBLElBQUksV0FBVyxJQUFJLEdBQUcsRUFBRSxPQUFPLEtBQUssQ0FBQyxFQUFFO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLFdBQVcsQ0FBQyxLQUFLLEVBQUU7QUFDdkIsUUFBUSxLQUFLLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUM7QUFDeEMsS0FBSztBQUNMO0FBQ0E7O0FDWk8sTUFBTSxXQUFXLFNBQVMsUUFBUSxDQUFDO0FBQzFDO0FBQ0EsSUFBSSxXQUFXLElBQUksR0FBRyxFQUFFLE9BQU8sS0FBSyxDQUFDLEVBQUU7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksV0FBVyxDQUFDLEtBQUssRUFBRTtBQUN2QixRQUFRLEtBQUssQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBQztBQUN0QyxLQUFLO0FBQ0w7QUFDQTs7QUNaTyxNQUFNLFdBQVcsU0FBUyxRQUFRLENBQUM7QUFDMUM7QUFDQSxJQUFJLFdBQVcsSUFBSSxHQUFHLEVBQUUsT0FBTyxLQUFLLENBQUMsRUFBRTtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSSxX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
