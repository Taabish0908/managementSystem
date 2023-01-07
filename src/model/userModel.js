// const mongoose = require('mongoose')
import mongoose from 'mongoose'
const ObjectId = mongoose.Schema.Types.ObjectId;

const userSchema = new mongoose.Schema({


    name: {
        type: String,
        required: true,
    },
    role:{
        type: String,
        required: true,
        trim: true
    },

    email: {
        type: String,
        lowercase: true,
        required: true,
        lowercase: true,
        unique: true
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    addedFlat: {
        type: String,
        ref: 'flat',
        
    }


}, { timestamps: true })



export default mongoose.model('user',userSchema)

