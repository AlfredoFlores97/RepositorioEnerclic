"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.middle = void 0;
const jwt_1 = require("../data/jwt");
const middle = (req, res, next) => {
    //Get the jwt token from the head
    const token = "stringsecretforjwt";
    if (token != jwt_1.jwt) {
        return res.status(404).json("Token no encontrado");
    }
    next();
};
exports.middle = middle;
//# sourceMappingURL=middle.js.map