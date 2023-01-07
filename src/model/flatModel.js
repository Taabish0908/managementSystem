// const mongoose = require('mongoose')
import mongoose from "mongoose";
const ObjectId = mongoose.Schema.Types.ObjectId;

const flatSchema = new mongoose.Schema({


    flatName: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type:[String]
    },

    title: {
        type:String,
        required:true
    },
    flatAddedBy: {
        type:ObjectId,
        ref:'admin'
    },
    status: {
        type: String,
        required: true,
        enum: ["vacant", "occupied"],
        trim: true
    },
    occupiedBy: {
        type:ObjectId,
        ref:'user'
    },
    isDeleted: {
        type: Boolean,
        default: false
    }


}, { timestamps: true })



export default mongoose.model('flat',flatSchema)