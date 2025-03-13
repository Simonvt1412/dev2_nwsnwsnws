"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const express_ejs_layouts_1 = __importDefault(require("express-ejs-layouts"));
const routes_1 = __importDefault(require("./routes"));
// Express app aanmaken
const app = (0, express_1.default)();
const PORT = 3000;
// EJS als template-engine instellen
app.set('view engine', 'ejs');
app.set('views', path_1.default.join(__dirname, 'views'));
// Middleware voor layouts
app.set('layout', 'layouts/main');
app.use(express_ejs_layouts_1.default);
// Middleware om statische bestanden te serveren
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
// Middleware om formulierdata te verwerken
app.use(express_1.default.urlencoded({ extended: true }));
// Routes gebruiken
app.use('/', routes_1.default);
// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err.stack);
    res.status(500).send('Something went wrong!');
});
// Server starten
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
