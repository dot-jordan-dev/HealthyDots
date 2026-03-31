const Contact = require('../models/Contact');

const submitContact = async (req, res) => {
    try {
        const { name, email, message } = req.body;

        const newContact = new Contact({ name, email, message });
        await newContact.save();

        res.status(201).json({ success: true, message: "Message sent successfully! " });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

module.exports = { submitContact };