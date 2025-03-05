
const { sendEmail } = require("../services/emailServices");

const sendUserEmail = async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        const response = await sendEmail(email, name, message);
        if (response.success) {
            return res.status(200).json({ message: "Email sent successfully" });
        } else {
            return res.status(500).json({ error: "Failed to send email" });
        }
    } catch (err) {
        console.error("Email sending error:", err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = { sendUserEmail };

