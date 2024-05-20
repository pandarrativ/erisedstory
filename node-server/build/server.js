"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
require("dotenv/config");
const DBConnector_1 = __importDefault(require("./utils/DBConnector"));
const router_1 = __importDefault(require("./routes/router"));
const corsOptions_1 = require("./utils/corsOptions");
const DOMAIN = process.env.DOMAIN;
const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;
const SECRET_KEY = process.env.JWT_SECRET_KEY;
const app = (0, express_1.default)();
app.use((0, express_session_1.default)({
    secret: SECRET_KEY || "pandarativ-not-secrect-key",
    resave: false,
    saveUninitialized: true,
    // cookie: { secure: 'auto' }  // secure: true in production if using HTTPS
}));
app.use((0, cors_1.default)(corsOptions_1.corsOptions));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/', router_1.default);
async function start() {
    try {
        const dbConnector = new DBConnector_1.default(MONGODB_URI);
        await dbConnector.connect();
        app.listen(PORT, () => {
            console.log(`⚡️Listening on http://localhost:${PORT}`);
        });
    }
    catch (error) {
        console.error('Error starting server:', error);
    }
}
start();
