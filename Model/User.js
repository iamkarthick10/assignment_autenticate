const mongoose = require('mongoose');
const { Schema } = mongoose;
const userSchema = new Schema({
    firstname:{
        type: String,
        trim: true,
        required: true
    },
    lastname: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    dateofBirth: {
        type: String
    },
    password: {
        type: String,
        required: true,
    },
    
}
)

const userModel = mongoose.model('User', userSchema)

module.exports = userModel;