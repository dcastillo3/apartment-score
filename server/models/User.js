const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    googleId: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String
    },
    userName: {
        type: String,
        trim: true
    },
    firstName: {
        type: String,
        trim: true
    },
    lastName: {
        type: String,
        trim: true
    },
    settings: {
        score: {
            type: mongoose.Schema.Types.Mixed,
            default: {}
        },
        note: {
            type: mongoose.Schema.Types.Mixed,
            default: {}
        }
    },
    apartments: {
        type: [mongoose.Schema.Types.Mixed],
        default: []
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    lastLogin: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

// Update last login on each authentication
UserSchema.methods.updateLastLogin = function() {
    this.lastLogin = Date.now();
    
    return this.save();
};

module.exports = mongoose.model('User', UserSchema);
