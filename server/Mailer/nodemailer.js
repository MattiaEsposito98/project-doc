const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.USER,
    pass: process.env.PASSWORD

  }
});

const sendMail = async (to, subject, text) => {
  try {
    const info = await transporter.sendMail({
      from: `"Il Mio Progetto" <${process.env.USER}>`, // La tua email Gmail
      to,
      subject,
      text
    });
    console.log("Email inviata: " + info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("Errore nell'invio dell'email: ", error);
    return { success: false, error: error.message };
  }
};

module.exports = sendMail;
