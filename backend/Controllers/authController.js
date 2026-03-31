const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const generateToken = (user) => {
    const payload = {
        userId: user._id,
        email: user.email
    };
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' });
};



    const register = async (req, res) => {
    try {
        const { name, email, password, phoneNumber } = req.body;

      
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Name, email, and password are required" });
        }

    
        const existUser = await User.findOne({ email: email.toLowerCase() });
        if (existUser) {
            return res.status(409).json({ message: "This email is already registered" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

     
        const newUser = await User.create({
            name,
            email: email.toLowerCase(),
            password: hashedPassword,
            phoneNumber: phoneNumber || ""
        });

        const token = generateToken(newUser);

        res.status(201).json({
            success: true,
            message: "User created successfully",
            token,
            data: { id: newUser._id, name: newUser.name, email: newUser.email }
        });

    } catch (err) {
        console.error("DETAILED REGISTER ERROR:", err); 
        res.status(500).json({ 
            message: "Registration failed", 
            error: err.message
           
        });
    }
};



const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = generateToken(user);

        res.status(200).json({
            message: "Login successful",
            data: {
                id: user._id,
                name: user.name,
                email: user.email,
                dailyCalorieGoal: user.dailyCalorieGoal,
                weight: user.weight,
                height: user.height,
                gender: user.gender,
                goalType: user.goalType
            },
            token
        });

    } catch (err) {
        res.status(500).json({ message: "Error during login", error: err.message });
    }
};
const updateProfile = async (req, res) => {
    try {
        const { weight, height, dailyCalorieGoal, dateOfBirth, gender, yourGoal } = req.body;

        const updatedUser = await User.findByIdAndUpdate(
            req.user. userId, 
            { 
                $set: { 
                    weight, 
                    height, 
                    dailyCalorieGoal, 
                    dateOfBirth, 
                    gender: gender.toLowerCase(), 
                    goalType: yourGoal.toLowerCase() 
                } 
            },
            { new: true, runValidators: true }
        ).select("-password");

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            data: updatedUser 
        });
    } catch (err) {
        res.status(500).json({ message: "Failed to update profile", error: err.message });
    }
};



const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select("-password");
        
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        
        res.status(200).json({ 
            success: true, 
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                dailyCalorieGoal: user.dailyCalorieGoal,
                weight: user.weight,
                height: user.height,
                gender: user.gender,
                goalType: user.goalType
            }
        });
    } catch (err) {
        console.error("getMe Error:", err);
        res.status(500).json({ message: "Error fetching profile", error: err.message });
    }
};

module.exports = { register, login, getMe, updateProfile };