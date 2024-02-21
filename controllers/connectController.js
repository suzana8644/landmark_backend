const connectModel = require('../models/Connect');
const transport = require('../email/email.js');

exports.connectCreate = async (req, res, next) => {
    try {
        const data = req.body;
        const email = data.email;

        await transport.sendMail({
            from: 'phuyalsujana17@gmail.com',
            to: data.email,
            subject: 'Hello from the landmark team.',
            text: 'Hello we have acknowledged your message ' + data.firstName + ' ' + data.lastName + ". We will connect with you soon."
        })

        await transport.sendMail({
            from: 'phuyalsujana17@gmail.com',
            to: 'phuyalsujana17@gmail.com',
            subject: 'Hello there from landmark.',
            text: 'Hello ' + data.firstName + ' ' + data.lastName + ' is trying to connect.',
            html: `
		<h2>Hello ${data.firstName} ${data.lastName} tried to connect with you:</h2>
		<h3>Message</h3>
		<p>${data.message}</p>
		`
        })

        const createdConnect = await connectModel.create(data);

        res.json(createdConnect);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Server error'});
    }

}