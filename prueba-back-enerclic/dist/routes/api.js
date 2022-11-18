"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const datos_1 = require("../data/datos");
const middle_1 = require("../middleware/middle");
const router = express_1.default.Router();
router.get('/api', middle_1.middle, (req, res, next) => {
    res.send(datos_1.datos);
});
exports.default = router;
//# sourceMappingURL=api.js.map