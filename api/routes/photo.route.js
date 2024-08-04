import express from 'express';
import multer from 'multer';
import path from 'path';
import { uploadPhoto, deletePhoto, updatePhotoCategory, getUploadedPhotos, getAllPhotos, likePhoto, downloadPhoto } from '../controllers/photo.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const uploadPath = path.join(__dirname, '..', '..', 'uploads');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, uploadPath);
    },
    filename: function(req, file, cb) {
        const filename = Date.now() + '-' + file.originalname;
        req.body.url = `http://localhost:3001/uploads/${filename}`;
        cb(null, filename);
    }
});

const upload = multer({ storage: storage });

router.post('/upload', verifyToken, upload.single('file'), uploadPhoto);
router.get('/', getAllPhotos);
router.get('/uploaded/:username', getUploadedPhotos);
router.delete('/delete/:id', verifyToken, deletePhoto);
router.patch('/update/:id', verifyToken, updatePhotoCategory);
router.post('/like/:id', verifyToken, likePhoto); 
router.post('/download/:id', verifyToken, downloadPhoto);

export default router;
