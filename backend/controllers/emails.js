require('dotenv').config()
const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  host: process.env.HOST_EMAIL,
  port: process.env.PORT_EMAIL,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_KEY,
  },
})

const URL = 'http://localhost:3000/enter/'

const send_magic_link = async (email, link, which) => {
  try {
    let subj, body
    if (which === 'signup') {
      ;(subj = 'Your sign up link'),
        (body =
          '<p>Hello friend and welcome to our website. This is your link to confirm your account: ' +
          (URL + email + '/' + link) +
          '</p><p>Needless to remind you not to share this link with anyone 🤫</p>')
    } else {
      ;(subj = 'Your sign in link'),
        (body =
          '<p>Hello friend and welcome back. This is your link to sign in: ' +
          (URL + email + '/' + link) +
          '</p><p>Needless to remind you not to share this link with anyone 🤫</p>')
    }

    const mailOptions = {
      to: email,
      from: process.env.EMAIL,
      subject: subj,
      html: body,
    }

    const response = await transporter.sendMail(mailOptions)
    return { ok: true, message: 'Email sent' }
  } catch (error) {
    return { ok: false, error }
  }
}

module.exports = { send_magic_link }
