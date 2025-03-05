require("dotenv").config();
const nodemailer = require("nodemailer");

const { emailUser, emailPassword, emailTo} = require("../config/env");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user:emailUser,
        pass: emailPassword,
    },
});

/**
 * Sends an email.
 * @param {string} to - Recipient email.
 * @param {string} subject - Email subject.
 * @param {string} text - Email body (plain text or HTML).
 * @returns {Promise} Resolves if email is sent, rejects otherwise.
 */
const sendEmail = async (userEmail, userName, userMessage) => {
    try {
        const mailOptions = {
            from: `"Krishnam Seeds" <${emailUser}>`,
            to: emailTo,
            subject: `krishnamseeds.in: New Inquiry from ${userName}`,
            
            html: `
                <p>Name: <strong>${userName}</strong></p>
                <p>Email: </strong> <strong>${userEmail}</strong></p>
                <p><em>Message:</em></p>
                <p style="font-style: italic;">${message}</p>
            `
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent successfully:", info.response);
        return { success: true, message: "Email sent successfully" };
    } catch (error) {
        console.error("Error sending email:", error);
        return { success: false, message: "Error sending email" };
    }
};

module.exports = { sendEmail };
