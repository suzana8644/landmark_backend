const express = require('express');
const imageController = require('../controllers/imageController');
const router = express.Router();
const formidable = require('formidable'); // Import Formidable


router.post("/upload", imageController.uploadFiles);
router.get("/files", imageController.getListFiles);
router.get("/files/:name", imageController.download);

module.exports = router;
