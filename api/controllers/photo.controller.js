import Photo from '../models/photo.model.js';
import { errorHandler } from '../utils/error.js';
import User from '../models/user.model.js';

export const getAllPhotos = async (req, res,next) => {
    try {
        const users = await Photo.find();
        res.status(200).json(users);
      } catch (error) {
        next(error);
      }
};

export const uploadPhoto = async (req, res, next) => {
    try {
        const newPhoto = new Photo({
            title: req.body.title,
            url: req.body.url,
            category: req.body.category,
            uploader: req.body.uploader
        });
        const savedPhoto = await newPhoto.save();
        res.status(200).json(savedPhoto);
    } catch (error) {
        next(error);
    }
};

export const getUploadedPhotos = async (req, res, next) => {
    try {
        const photos = await Photo.find({ uploader: req.params.username });
        res.status(200).json(photos);
    } catch (error) {
        next(error);
    }
};

export const deletePhoto = async (req, res, next) => {
    try {
        await Photo.findByIdAndDelete(req.params.id);
        res.status(200).json('Photo has been deleted');
    } catch (error) {
        next(error);
    }
};

export const updatePhotoCategory = async (req, res, next) => {
    try {
        const updatedPhoto = await Photo.findByIdAndUpdate(
            req.params.id,
            { $set: { category: req.body.category } },
            { new: true }
        );
        res.status(200).json(updatedPhoto);
    } catch (error) {
        next(error);
    }
};

export const likePhoto = async (req, res) => {
    const { id } = req.params;
    try {
        const photo = await Photo.findById(id);
        if (!photo) {
            return res.status(404).json({ message: 'Photo not found' });
        }
        const username = req.user.username; 
        const index = photo.likes.indexOf(username);
        if (index === -1) {
            photo.likes.push(username);
        } else {
            photo.likes.splice(index, 1);
        }

        await photo.save();
        res.json(photo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

import nodemailer from 'nodemailer';

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'modigamiruna50@gmail.com', 
        pass: 'dudayovdtqbvugkf' // application password
    }
});

export const downloadPhoto = async (req, res) => {
    const { id } = req.params;
    try {
        const photo = await Photo.findById(id);
        if (!photo) {
            return res.status(404).json({ message: 'Photo not found' });
        }
        photo.downloads += 1;
        await photo.save();

        const uploader = await User.findOne({ username: photo.uploader });
  
        let mailOptions = {
            from: 'modigamiruna50@gmail.com',
            to: uploader.email,
            subject: 'Celebrate the good news!',
            text: `Your photograph, ${photo.title}, has just been downloaded. Until now, it has been downloaded ${photo.downloads} times.
            Thank you for sharing your art with us and continue to inspire our community with your wonderful works.`
        };

        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

        res.json(photo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};