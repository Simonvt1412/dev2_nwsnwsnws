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
const express_1 = __importDefault(require("express"));
const newsService_1 = require("./services/newsService");
const router = express_1.default.Router();
// Type voor async handlers
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};
// GET / - Laadt de homepage
router.get('/', asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const news = yield (0, newsService_1.getAllNews)();
    res.render('layouts/news', { news, title: 'Recent nieuws' }); // Wijzig naar 'layouts/news'
})));
// GET /comments - Toon alle comments
router.get('/comments', asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const comments = yield (0, newsService_1.getAllComments)();
    res.render('layouts/comments', { comments, title: 'Alle Comments' }); // Wijzig naar 'layouts/comments'
})));
// GET /news/:id - Toon detailpagina van een nieuwsbericht
router.get('/news/:id', asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newsId = parseInt(req.params.id);
    const article = yield (0, newsService_1.getNewsById)(newsId);
    if (article.length === 0) {
        return res.status(404).send('News article not found');
    }
    const comments = yield (0, newsService_1.getCommentsByNewsId)(newsId);
    res.render('layouts/news_detail', {
        article: article[0],
        comments,
        title: article[0].title
    }); // Wijzig naar 'layouts/news_detail'
})));
// POST /news/:id/comment - Voeg een comment toe
router.post('/news/:id/comment', asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newsId = parseInt(req.params.id);
    const { author, comment } = req.body;
    yield (0, newsService_1.addComment)(newsId, author, comment);
    res.redirect(`/news/${newsId}`);
})));
exports.default = router;
