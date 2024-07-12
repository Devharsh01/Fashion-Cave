const nodemailer = require('nodemailer')

const sendEmail = async (option) => {
    const email_user = 'devharsh213@gmail.com'
    const email_password = '1894'
    //CREATE A TRANSPORTER
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: email_user,
            pass: email_password,
        }
    })

    const emailOptions = {
        from: "Fashion Cave support<support@fashioncave.com>",
        to: option.email,
        subject: option.subject,
        text: option.message,
    }

    await transporter.sendmail(emailOptions);
}

module.exports = sendEmail;