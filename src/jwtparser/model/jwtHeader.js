import { AlgorithmMeta } from "./header/algorithmMeta.js";
import { TypeMeta } from "./header/typeMeta.js";
import { KeyIdMeta } from "./header/keyIdMeta.js";

export class JwtHeader {

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