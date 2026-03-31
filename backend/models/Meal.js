const mongoose = require("mongoose");

const MealSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    title: {
        type: String,
        required: [true, "Meal title is required"],
        trim: true
    },

    cals: {
        type: Number,
        required: [true, "Calories amount is required"]
    },
    date: {
        type: Date,
        default: Date.now 
    }
}, { timestamps: true });

module.exports = mongoose.model("Meal", MealSchema);