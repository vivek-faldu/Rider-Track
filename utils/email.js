/*
* utility file to handle emails sent to the users.
* Author: Sai Saran Kandimalla.
* Date: 11/03/2019
* Task: #122
* referred from: https://www.w3schools.com/nodejs/nodejs_email.asp
*/
const mail = require('nodemailer');

const sendEventCancelNotificationEmail = (user, eventName) => {

    const transporter = mail.createTransport({
        service: 'gmail',
        auth : {
            user: 'donotreply.ridertrack@gmail.com',
            pass: 'Team1@517'
        }
    });

    const mailContent = {
        from: 'donotreply.ridertrack@gmail.com',
        to: user.email,
        subject: 'Event Cancel Notification',
        text: 'Dear' + user.username + ',\n' + 
            'We regret to inform you that the event' + eventName + 
            'has been cancelled by the event organiser. Please contact the support if you have more questions.'
    };

    transporter.sendMail(mailContent, (error, information) => {
        if(error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + information.response);
        }
    });
}

module.exports = sendEventCancelNotificationEmail;