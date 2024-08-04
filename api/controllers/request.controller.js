import Request from '../models/request.model.js';
import { errorHandler } from '../utils/error.js';

export const getRequests = async (req, res, next) => {
    try {
        const requests = await Request.find();
        res.status(200).json(requests);
    } catch (error) {
        next(error);
    }
};

export const createRequest = async (req, res, next) => {
    const request = new Request(req.body);
    try {
        await request.save();
        res.status(201).json('Request created successfully!');
    } catch (error) {
        next(error);
    }
};

export const updateRequest = async (req, res, next) => {
    const { id } = req.params;
    const request = req.body;
    try {
        const updatedRequest = await Request.findByIdAndUpdate(id, request, { new: true });
        res.json(updatedRequest);
    } catch (error) {
        next(error);
    }
};

export const deleteRequest = async (req, res, next) => {
    console.log('Deleting request with ID:', req.params.id);
    if (req.user.usertype !== 'admin') {
      return next(errorHandler(403, 'You are not allowed to delete this request'));
    }
    try {
      try {
        await Request.findByIdAndDelete(req.params.id);
    } catch (error) {
        console.error('Error deleting request:', error);
        next(error);
    }
    
      res.status(200).json('Request has been deleted');
    } catch (error) {
      next(error);
    }
  };
