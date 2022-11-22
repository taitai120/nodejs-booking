import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
    res.end("all users");
});

export default router;
