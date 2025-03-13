import sql from './db';
import { News, Comment } from '../types';

// Haal alle nieuwsberichten op
export async function getAllNews(): Promise<News[]> {
    try {
        const data: News[] = await sql`SELECT * FROM news ORDER BY created_at DESC`;
        return data;
    } catch (error) {
        console.error('Error fetching news:', error);
        throw new Error('Could not fetch news: ' + (error instanceof Error ? error.message : String(error)));
    }
}

// Haal een specifiek nieuwsbericht op
export async function getNewsById(id: number): Promise<News[]> {
    try {
        const data: News[] = await sql`SELECT * FROM news WHERE id = ${id}`;
        return data;
    } catch (error) {
        console.error('Error fetching news by ID:', error);
        throw new Error(`Could not fetch news with ID ${id}: ` + (error instanceof Error ? error.message : String(error)));
    }
}

// Haal alle comments op (voor de /comments route)
export async function getAllComments(): Promise<Comment[]> {
    try {
        const data: Comment[] = await sql`
            SELECT c.id, c.news_id, c.author, c.content AS comment, c.created_at, n.title AS news_title
            FROM comments c
            JOIN news n ON c.news_id = n.id
            ORDER BY c.created_at DESC
        `;
        return data;
    } catch (error) {
        console.error('Error fetching comments:', error);
        throw new Error('Could not fetch comments: ' + (error instanceof Error ? error.message : String(error)));
    }
}

// Haal comments op voor een specifiek nieuwsbericht
export async function getCommentsByNewsId(newsId: number): Promise<Comment[]> {
    try {
        const data: Comment[] = await sql`
            SELECT c.id, c.news_id, c.author, c.content AS comment, c.created_at
            FROM comments c
            WHERE c.news_id = ${newsId}
            ORDER BY c.created_at DESC
        `;
        return data;
    } catch (error) {
        console.error('Error fetching comments for news ID:', error);
        throw new Error(`Could not fetch comments for news ID ${newsId}: ` + (error instanceof Error ? error.message : String(error)));
    }
}

// Voeg een comment toe
export async function addComment(newsId: number, author: string, comment: string): Promise<void> {
    try {
        await sql`
            INSERT INTO comments (news_id, author, content)
            VALUES (${newsId}, ${author}, ${comment})
        `;
    } catch (error) {
        console.error('Error adding comment:', error);
        throw new Error('Could not add comment: ' + (error instanceof Error ? error.message : String(error)));
    }
}