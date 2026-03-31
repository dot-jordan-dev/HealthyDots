const express = require("express");
const router = express.Router();
const { 
    register, 
    login, 
    getMe, 
    updateProfile, 
   
} = require("../Controllers/authController");

const authMiddleware = require("../middleware/authMiddleware");


router.post("/register", register);
router.post("/login", login);      


router.get("/me", authMiddleware, getMe);                   
router.put("/update-profile", authMiddleware, updateProfile);



module.exports = router;