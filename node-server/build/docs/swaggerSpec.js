"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerSpec = void 0;
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const path_1 = __importDefault(require("path"));
const PORT = process.env.PORT;
const options = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Pandarrativ',
            version: '1.0.0',
            description: 'API Documentation',
        },
        servers: [
            {
                url: `http://localhost:${PORT}/user`,
                description: 'Dev Server',
            },
        ],
    },
    apis: [path_1.default.resolve(__dirname, 'apis.yaml')],
};
exports.swaggerSpec = (0, swagger_jsdoc_1.default)(options);
