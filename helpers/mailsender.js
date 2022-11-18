const nodemailer = require('nodemailer');
require('dotenv').config();
const { promisify } = require('util');
const fs = require('fs');
const handlebars  = require ('handlebars');


const emailSender = async(email, username, password) => {

    const readFile = promisify(fs.readFile)
    let html = await readFile( __dirname +'/index.html','utf8');
    let template = handlebars.compile(html);
    let htmlToSend = template({username, password});
    
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: "pdevpruebas09@gmail.com",
            pass: "wfuscgiypkwrtckw"
        },
    });
    
    transporter.verify().then(console.log).catch(console.error);
    
    

    var mailOptions = {
        from: '"Reto Kruger" <pdevpruebas09@gmail.com>',
        bcc: email,
        subject: "Usuario Registrado",
        html: htmlToSend,
    }
        
    transporter.sendMail(mailOptions, (error, info) => {
        if(error){
            console.log(error)
        } else {
            console.log(`Email enviado: ${email}`)
        }
        });  
}

module.exports = {emailSender};
