const express = require('express');
const cors = require('cors');
const ConnectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const mealRoutes = require("./routes/mealRoutes");
const ContactRoute= require('./routes/contactRoutes');

require('dotenv').config();
 

ConnectDB()
const app = express();
const PORT = process.env.PORT || 5001;


app.use(cors({
  origin: 'https://healthy-dots-icxn.vercel.app', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
لهف
app.use("/api/auth", authRoutes);
app.use("/api/meals", mealRoutes)
app.use('/api/Contact',ContactRoute)

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});