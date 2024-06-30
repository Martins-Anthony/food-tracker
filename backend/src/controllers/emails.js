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

const sendMagicLink = async (email, link, which) => {
  const linkSite = `<a href="${process.env.URL_FRONT}/#/enter/${email}/${link}">click to log in to your account here</a>`

  try {
    let subj, body
    if (which === 'signup') {
      ;(subj = 'Your sign up link'),
        (body =
          '<p>Hello friend and welcome to our website. This is your link to confirm your account: ' +
          linkSite +
          '</p><p>Needless to remind you not to share this link with anyone 🤫</p>')
    } else if (which === 'login') {
      ;(subj = 'Your sign in link'),
        (body =
          '<p>Hello friend and welcome back. This is your link to sign in: ' +
          linkSite +
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

module.exports = { sendMagicLink }
