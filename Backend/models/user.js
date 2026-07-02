const mongoose = require('mongoose');

const UserScheema = new mongoose.Scheema({
    user: {
        type: String,
        require: [true, 'Name is required'],
        trim: true

    },
    email: {
        type: String,
        require: [true, 'Email is required'],
        unique: true,
        trim:  true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address']
    }, 
    password: {
        type: String,
        require: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters long']
    }, 
    role:{
        type: String,
        enum: ['candidate', 'admin'],
        default: ['candidate']
    }, 
    createdAt:{
        type:date,
        default: Date.now
    }
})




// Compile the schema into a Mongoose model and export it
module.exports = mongoose.model('User', userSchema);