"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
class DBConnector {
    dbUri;
    constructor(dbUri) {
        if (!dbUri) {
            throw new Error('Database URI is not provided.');
        }
        this.dbUri = dbUri;
    }
    async connect() {
        try {
            await mongoose_1.default.connect(this.dbUri);
            console.log('⚡️Connected to database');
        }
        catch (error) {
            console.error('Error connecting to database:', error);
            throw error;
        }
    }
}
exports.default = DBConnector;
