const express = require("express");
const multer = require("multer");
const Document = require("../models/Document");
const router = express.Router();

// Multer storage setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// Upload Document
router.post("/upload", upload.single("document"), async (req, res) => {
  try {
    const userId = req.body.userId;
    const user = await User.findById(userId);
    
    if (!user || user.credits < 5) return res.status(400).json({ message: "Not enough credits" });

    user.credits -= 5;
    await user.save();

    const newDoc = new Document({ userId, filePath: req.file.path });
    await newDoc.save();

    res.json({ message: "File uploaded successfully", document: newDoc });

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
