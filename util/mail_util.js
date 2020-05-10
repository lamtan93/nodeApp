const nodemailer = require('nodemailer');
const PORT = 8080;

const sendEmail = async (mailUser, secretKey)=>{
    
    try {
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'lamtan93@gmail.com',
                pass: 'Heoyeutho1993'
            }
        });
    
        let mailOptions = {
            from : 'Papa de Corgi <lamtan93@gmail.com>',
            to: mailUser,
            subject: 'Activate email user',
            html: `Nous sommes très ravi de vous compter parmis nos clients, veuillez trouvez la modalité ci-dessous pour activer votre compte.
            <h1:>Please click here to activate your account</h1:>
            http://192.168.0.28:8080/users/activateUser?secretKey=${secretKey}&email=${mailUser}`
        };
    
        let info = await transporter.sendMail(mailOptions);
        console.log(`Mail sent: ${info.messageId}`);    
    } catch (error) {
        throw error;
    }
    
};

module.exports = {sendEmail};