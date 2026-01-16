const express = require("express");
const router = express.Router();
const { reviewCode } = require("../services/ai.service");

router.post("/", async (req, res) => {
  try {
    const { code, language } = req.body;

    if (!code) {
      return res.status(400).json({ error: "No code provided" });
    }

    const review = await reviewCode(code, language);
    res.json({ review });

  } catch (err) {
    console.error("❌ Review error:", err.message);
    res.status(500).json({ error: "AI failed to generate review" });
  }
});

module.exports = router;
