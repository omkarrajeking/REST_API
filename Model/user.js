const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    number: {
        type: String,
        required: true,
    },
});


mongoose.connect('mongodb+srv://omkarraje2203:10072000@cluster0.lcw2w.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => {
        console.log('MongoDB connected');
    })
    .catch((err) => {
        console.log('Error:', err);
    });


const User = mongoose.model('otssolution', userSchema);

module.exports = {User};