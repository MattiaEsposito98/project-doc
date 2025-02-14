const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASSWORD
  }
});

const sendMail = async (to, subject, text) => {
  try {
    const info = await transporter.sendMail({
      from: '"Il Mio Progetto" <DocAdvisor>',
      to,
      subject,
      text
    });
    console.log("Email inviata: " + info.messageId);
    return { success: true, messageId: info.messageId }

  } catch (error) {
    console.error("Errore nell'invio dell'email: ", error);
    return { success: false, error: error.message }
  }
};

module.exports = sendMail;
