const nodemailer = require('nodemailer');
require('dotenv').config();

const transport = nodemailer.createTransport({
	host: 'smtp.gmail.com',
	secure: true,
	auth: {
		user: 'phuyalsujana17@gmail.com',
		pass: process.env.NODEMAILER_SMTP_CODE
	}
})

module.exports = transport;
