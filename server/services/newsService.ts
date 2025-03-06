// Importeer sql uit db.ts
import sql from "./db";

// Interface voor een nieuwsartikel
export interface News {
  id?: number;
  slug?: string;
  title: string;
  content?: string;
  image_url?: string;
  created_at?: string;
}

// Alle nieuwsartikelen ophalen
export async function getAllNews(): Promise<News[]> {
    try {
        const data : News[] = await sql`select * from news`;
        return data;

    } catch (error) {
        console.error('Error fetching news:', error);
        throw new Error('Could not fetch news: ' + error);
    }
}