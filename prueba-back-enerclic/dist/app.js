"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const api_1 = __importDefault(require("./routes/api"));
const home_1 = __importDefault(require("./routes/home"));
const app = (0, express_1.default)();
app.get('/', home_1.default);
app.get('/api', api_1.default);
const port = 5003;
app.listen(port, () => console.log(`App listening on PORT ${port}`));
//# sourceMappingURL=app.js.map