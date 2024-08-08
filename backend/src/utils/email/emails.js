const fs = require('fs')
const path = require('path')
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
  const templatePath = path.join(
    __dirname,
    '../../templates',
    'emailTemplate.html',
  )
  const logoPath = path.join(__dirname, '../../templates', 'emailLogo.html')

  const template = fs.readFileSync(templatePath, 'utf-8')
  const logo = fs.readFileSync(logoPath, 'utf-8')

  let header, content, subject
  const linkSite = `<a href="${process.env.URL_FRONT}/#/enter/${email}/${link}" class="btn">Cliquez ici</a>`

  if (which === 'signup') {
    subject = "Votre lien d'inscription à FOOD TRACKER"
    header = 'Bonjour,'
    content = `<p>Veuillez cliquer sur le lien pour confirmer votre compte : ${linkSite}</p> `
  } else if (which === 'login') {
    subject = 'Votre lien de connexion à FOOD TRACKER'
    header = 'Bonjour,'
    content = `<p>Voici votre lien pour vous connecter : ${linkSite}</p>`
  }

  const html = template
    .replace('{{header}}', header)
    .replace('{{content}}', content)
    .replace(/{{logo}}/g, logo)

  const mailOptions = {
    to: email,
    from: process.env.EMAIL,
    subject: subject,
    html,
  }
  try {
    const response = await transporter.sendMail(mailOptions)
    return { ok: true, message: 'Email sent' }
  } catch (error) {
    return { ok: false, error }
  }
}

module.exports = { sendMagicLink }
