const sgMail = require('@sendgrid/mail');

const sendEmail = async (options) => {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const msg = {
        to: options.email,
        from: process.env.EMAIL_FROM, // Use the email address or domain you verified with SendGrid
        subject: options.subject,
        html: options.html,
    };

    try {
        await sgMail.send(msg);
    } catch (error) {
        console.error('SendGrid Error:', error);
        if (error.response) {
            console.error(error.response.body);
        }
        throw new Error('Email could not be sent');
    }
};

module.exports = sendEmail;
