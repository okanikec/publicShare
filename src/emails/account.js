sgMail = require('@sendgrid/mail')



sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'okanikec@isu.edu',
        subject: 'Welcome',
        text: `Welcome to the app, ${name}. Let me know what you think about the app.`
    })
}

const sendCancelationEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'okanikec@isu.edu',
        subject: 'Sorry to see you go',
        text: `Goodbye ${name}, we hope you come back.`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancelationEmail
}