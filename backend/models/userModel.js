const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    website: {
        type: String,
        required: true
    },
    address: {
        street: {
            type: String,
        },
        suite: {
            type: String,
        },
        city: {
            type: String,
        },
        zipcode: {
            type: String,
        }
    },
    company: {
        name: {
            type: String,
        }
    }
});

const userModel = mongoose.models.user || mongoose.model("user", userSchema);

module.exports = userModel;
