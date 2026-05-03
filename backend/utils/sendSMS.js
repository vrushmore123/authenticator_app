const twilio = require('twilio');

const sendSMS = async (options) => {
    const client = twilio(process.env.TWILIO_SID.trim(), process.env.TWILIO_AUTH_TOKEN.trim());
    console.log("twilio sid", process.env.TWILIO_SID);

    await client.messages.create({
        body: options.message,
        from: process.env.TWILIO_PHONE,
        to: options.phoneNumber
    });
};

module.exports = sendSMS;
