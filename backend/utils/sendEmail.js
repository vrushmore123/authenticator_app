const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
    console.log('Attempting to send email to:', options.email);
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // use SSL
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    console.log('Transporter created for:', process.env.EMAIL_USER);

    const mailOptions = {

        from: `"Authenticator App" <${process.env.EMAIL_USER}>`,
        to: options.email,
        subject: options.subject,
        html: options.html,
    };

    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error('Nodemailer Error:', error);
        throw new Error('Email could not be sent');
    }
};

module.exports = sendEmail;

