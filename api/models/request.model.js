import mongoose from "mongoose";

const requestSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['awaiting', 'confirmed', 'completed'],
        default: 'awaiting',
    },
    serviceType: {
        type: String,
        required: true,
    },
    assignedPhotographer: {
        type: String,
        default: '',
    },
}, { timestamps: true });

const Request = mongoose.model('Request', requestSchema);

export default Request;
