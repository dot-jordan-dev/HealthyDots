const express = require("express");
const router = express.Router();
const { 
    addMeal, 
    getMyMeals, 
    deleteMeal 
} = require("../Controllers/mealController");
const auth = require("../middleware/authMiddleware");


router.get("/all", auth, getMyMeals);


router.post("/add", auth, addMeal);


router.delete("/delete/:id", auth, deleteMeal);

module.exports = router;