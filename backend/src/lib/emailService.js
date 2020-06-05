'use strict'
require('dotenv/config');

const sendConfig = require('../config/sendgrid');
const sendgrid = require('@sendgrid/mail');

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

exports.send = async (to, subject, body) => {    
 
    try {
        sendgrid.send({
            to: to,
            from: sendConfig.EMAIL_FROM,
            subject: subject,
            //text: 'alksçaskç',
            html: body
        }).then(() => {
            console.log("E-mail enviado com sucesso!")
        }).catch(e => {
            console.log("Erro no envio de e-mail.", e.response.body)
           
        });
        
    } catch (error) {
        console.log("Erro no Sendgrid: ", error);
    }
   
};


// Por algum motivo desconhecido o sendgrid não está funcionando com import e export
// import 'dotenv/config';
// import sendConfig from '../config/sendgrid';
// import sendgrid from '@sendgrid/mail';

// sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

// const send = (to, subject, body) => {    
  
//     try {
//         sendgrid.send({
//             to: to,
//             from: sendConfig.EMAIL_FROM,
//             subject: subject,
//             //text: 'alksçaskç',
//             html: body
//         }).then(() => {
//             console.log("E-mail enviado com sucesso!")
//         }).catch(e => {
//             console.log("Erro no envio de e-mail.", e.response.body)
           
//         });
        
//     } catch (error) {
//         console.log("Erro no sendgrid: ", error);
//     }
   
// };

// export default send;