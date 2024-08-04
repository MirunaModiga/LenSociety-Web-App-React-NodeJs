import express from 'express';
import { getRequests, createRequest, updateRequest, deleteRequest } from '../controllers/request.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.get('/', getRequests);
router.post('/create',verifyToken, createRequest);
router.patch('/update/:id',verifyToken, updateRequest);
router.delete('/delete/:id', verifyToken, deleteRequest);

export default router;
