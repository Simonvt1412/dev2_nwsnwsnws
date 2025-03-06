import express, { Request, Response } from "express";
import path from "path";
import { News, getAllNews } from "./services/newsService";

const router = express.Router();

/**
 * GET / - Laadt de homepagina
 */
router.get("/", (req: Request, res: Response) => {
    res.redirect("/news");
});

router.get("/news", async (req: Request, res: Response) => {
    const news: News[] = await getAllNews();
  
    res.render("news", { news, title: "Recent nieuws" });
  });

export default router;