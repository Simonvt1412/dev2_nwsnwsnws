"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const postgres_1 = __importDefault(require("postgres"));
const SB_POSTGRES_URL = process.env.SB_POSTGRES_URL || 'postgresql://postgres:postgres@127.0.0.1:54322/postgres';
const sql = (0, postgres_1.default)(SB_POSTGRES_URL);
// Testquery om te controleren of de verbinding werkt
sql `SELECT 1`.then(result => console.log('Database connection test:', result)).catch(err => console.error('Connection error:', err));
exports.default = sql;
