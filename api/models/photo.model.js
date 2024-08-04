import mongoose from "mongoose";

const photoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    uploader: {
        type: String,
        required: true,
    },
    likes: {
        type: [String],
        default: [],
    },
    downloads: {
        type: Number, 
        default: 0, 
    },
}, { timestamps: true });

const Photo = mongoose.model('Photo', photoSchema);

export default Photo;
