import { News, getAllNews } from "./services/newsService";
import { Router, Request, Response } from "express";

const router = Router();
router.get("/news", async (req: Request, res: Response) => {
  const news: News[] = await getAllNews();

  res.render("news", { news, title: "Recent nieuws" });
});