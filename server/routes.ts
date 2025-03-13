import express, { Router, Request, Response, NextFunction } from 'express';
import { getAllNews, getNewsById, getAllComments, getCommentsByNewsId, addComment } from './services/newsService';
import { News, Comment } from './types'; // Importeer News en Comment expliciet

const router = express.Router();

// Type voor async handlers
const asyncHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) => 
    (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };

// GET / - Laadt de homepage
router.get('/', asyncHandler(async (req: Request, res: Response) => {
    const news: News[] = await getAllNews();
    res.render('layouts/news', { news, title: 'Recent nieuws' }); // Wijzig naar 'layouts/news'
}));

// GET /comments - Toon alle comments
router.get('/comments', asyncHandler(async (req: Request, res: Response) => {
    const comments: Comment[] = await getAllComments();
    res.render('layouts/comments', { comments, title: 'Alle Comments' }); // Wijzig naar 'layouts/comments'
}));

// GET /news/:id - Toon detailpagina van een nieuwsbericht
router.get('/news/:id', asyncHandler(async (req: Request, res: Response) => {
    const newsId = parseInt(req.params.id);
    const article: News[] = await getNewsById(newsId);
    if (article.length === 0) {
        return res.status(404).send('News article not found');
    }

    const comments: Comment[] = await getCommentsByNewsId(newsId);

    res.render('layouts/news_detail', { 
        article: article[0], 
        comments, 
        title: article[0].title 
    }); // Wijzig naar 'layouts/news_detail'
}));

// POST /news/:id/comment - Voeg een comment toe
router.post('/news/:id/comment', asyncHandler(async (req: Request, res: Response) => {
    const newsId = parseInt(req.params.id);
    const { author, comment } = req.body;

    await addComment(newsId, author, comment);
    res.redirect(`/news/${newsId}`);
}));

export default router;