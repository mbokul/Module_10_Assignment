const nodemailer = require('nodemailer');

const sendMail = async (mailTo, mailText, mailSubject) => {
   try {
      const transporter = nodemailer.createTransport({
         host: 'mail.teamrabbil.com',
         port: 25,
         secure: false,
         auth: {
            user: 'info@teamrabbil.com',
            pass: '~sR4[bhaC[Qs',
         },
         tls: {
            rejectUnauthorized: false,
         },
      });

      const mailOptions = {
         from: 'Student Registry <info@teamrabbil.com>',
         to: mailTo,
         subject: mailSubject,
         text: mailText,
      };

      const result = await transporter.sendMail(mailOptions);
      return result;
   } catch (error) {
      throw error;
   }
};

module.exports = sendMail;
