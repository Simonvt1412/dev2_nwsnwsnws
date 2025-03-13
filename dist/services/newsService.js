"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllNews = getAllNews;
exports.getNewsById = getNewsById;
exports.getAllComments = getAllComments;
exports.getCommentsByNewsId = getCommentsByNewsId;
exports.addComment = addComment;
const db_1 = __importDefault(require("./db"));
// Haal alle nieuwsberichten op
function getAllNews() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield (0, db_1.default) `SELECT * FROM news ORDER BY created_at DESC`;
            return data;
        }
        catch (error) {
            console.error('Error fetching news:', error);
            throw new Error('Could not fetch news: ' + (error instanceof Error ? error.message : String(error)));
        }
    });
}
// Haal een specifiek nieuwsbericht op
function getNewsById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield (0, db_1.default) `SELECT * FROM news WHERE id = ${id}`;
            return data;
        }
        catch (error) {
            console.error('Error fetching news by ID:', error);
            throw new Error(`Could not fetch news with ID ${id}: ` + (error instanceof Error ? error.message : String(error)));
        }
    });
}
// Haal alle comments op (voor de /comments route)
function getAllComments() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield (0, db_1.default) `
            SELECT c.id, c.news_id, c.author, c.content AS comment, c.created_at, n.title AS news_title
            FROM comments c
            JOIN news n ON c.news_id = n.id
            ORDER BY c.created_at DESC
        `;
            return data;
        }
        catch (error) {
            console.error('Error fetching comments:', error);
            throw new Error('Could not fetch comments: ' + (error instanceof Error ? error.message : String(error)));
        }
    });
}
// Haal comments op voor een specifiek nieuwsbericht
function getCommentsByNewsId(newsId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield (0, db_1.default) `
            SELECT c.id, c.news_id, c.author, c.content AS comment, c.created_at
            FROM comments c
            WHERE c.news_id = ${newsId}
            ORDER BY c.created_at DESC
        `;
            return data;
        }
        catch (error) {
            console.error('Error fetching comments for news ID:', error);
            throw new Error(`Could not fetch comments for news ID ${newsId}: ` + (error instanceof Error ? error.message : String(error)));
        }
    });
}
// Voeg een comment toe
function addComment(newsId, author, comment) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield (0, db_1.default) `
            INSERT INTO comments (news_id, author, content)
            VALUES (${newsId}, ${author}, ${comment})
        `;
        }
        catch (error) {
            console.error('Error adding comment:', error);
            throw new Error('Could not add comment: ' + (error instanceof Error ? error.message : String(error)));
        }
    });
}
