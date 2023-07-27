const multer = require('multer');
const { nanoid } = require('nanoid');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './public/uploads/');
    },
    filename: (req, file, callback) => {
        callback(null, nanoid(10) + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 }
}).single('file'); // file input name

const storeStorage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './public/storeUploads/');
    },
    filename: (req, file, callback) => {
        callback(null, nanoid(10) + path.extname(file.originalname));
    }
});

const storeUpload = multer({
    storage: storeStorage, // don't know how this manage to work but ok
    limits: { fileSize: 1024 * 1024 }
}).single('file');

module.exports = { upload, storeUpload };