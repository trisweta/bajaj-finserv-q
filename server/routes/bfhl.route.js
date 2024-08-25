import express from "express";
import { handlePostRequest, handleGetRequest } from "../controllers/bfhl.controller.js";

const router = express.Router();

router.post("/", handlePostRequest);
router.get("/", handleGetRequest);

export default router;
