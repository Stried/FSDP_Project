const express = require('express')
const router = express.Router();
const { validateToken } = require('../middlewares/auth');
const { upload, storeUpload } = require('../middlewares/upload');

router.post('/upload', validateToken, upload, (req, res) => {
    res.json({ filename: req.file.filename });
});

router.post('/storeUpload', validateToken, storeUpload, (req, res) => {
    res.json({ filename: req.file.filename });
});

module.exports = router;