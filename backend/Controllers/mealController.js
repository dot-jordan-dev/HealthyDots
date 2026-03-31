const Meal = require("../models/Meal");


const addMeal = async (req, res) => {
    try {
   
        const { title, cals } = req.body;

        if (!title || !cals) {
            return res.status(400).json({ success: false, message: "Title and cals are required" });
        }

        const userId = req.user.userId || req.user.id;

        const newMeal = await Meal.create({
            userId: userId,
            title,
            cals
        });

        res.status(201).json(newMeal); 
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};


const getMyMeals = async (req, res) => {
    try {
        const userId = req.user.userId || req.user.id;
        const meals = await Meal.find({ userId: userId }).sort({ createdAt: -1 });
        res.status(200).json(meals); 
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};


const deleteMeal = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.userId || req.user.id;
        const meal = await Meal.findOneAndDelete({ _id: id, userId: userId });

        if (!meal) {
            return res.status(404).json({ success: false, message: "Not found" });
        }
        res.status(200).json({ success: true });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

module.exports = { addMeal, getMyMeals, deleteMeal };