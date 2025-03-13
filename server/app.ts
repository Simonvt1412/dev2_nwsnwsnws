import express, { Application, Request, Response, NextFunction } from 'express';
import path from 'path';
import expressLayouts from 'express-ejs-layouts';
import routes from './routes';

// Express app aanmaken
const app: Application = express();
const PORT: number = 3000;

// EJS als template-engine instellen
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware voor layouts
app.set('layout', 'layouts/main');
app.use(expressLayouts);

// Middleware om statische bestanden te serveren
app.use(express.static(path.join(__dirname, 'public')));

// Middleware om formulierdata te verwerken
app.use(express.urlencoded({ extended: true }));

// Routes gebruiken
app.use('/', routes);

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error('Error:', err.stack);
    res.status(500).send('Something went wrong!');
});

// Server starten
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});