"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runServer = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
const runServer = async () => {
    app.use("/", express_1.default.static("../ui/build"));
    // app.get("/", (req, res) => {
    // 	res.send("Hello");
    // });
    app.listen(port, () => {
        console.log(`[server]: Server is running at http://localhost:${"../ui/"}`);
    });
};
exports.runServer = runServer;
