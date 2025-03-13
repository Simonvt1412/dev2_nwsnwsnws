import postgres from 'postgres';

const SB_POSTGRES_URL: string = process.env.SB_POSTGRES_URL || 'postgresql://postgres:postgres@127.0.0.1:54322/postgres';
const sql = postgres(SB_POSTGRES_URL);

// Testquery om te controleren of de verbinding werkt
sql`SELECT 1`.then(result => console.log('Database connection test:', result)).catch(err => console.error('Connection error:', err));

export default sql;