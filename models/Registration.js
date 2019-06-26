const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        tring: true,
    },
});
module.exports = mongoose.model('Registration', registrationSchema);
