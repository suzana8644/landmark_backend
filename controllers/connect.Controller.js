const connectModel = require('../models/Connect');
const transport = require('../email/email.js');

exports.connectCreate = async (req, res, next) => {
    try {
        const data = req.body;
	const email = data.email;

	const result = await transport.sendMail({
		from: 'kcshrawan879@gmail.com',
		to: data.email,
		subject: 'Hello there from landmark.',
		text: 'Hello ' + data.firstName + ' ' + data.lastName
	})

        const createdConnect = await connectModel.create(data);
    
        return res.json(createdConnect);
    } catch (error) {
	console.log(error);
	return res.status(500).json({ message: 'Server error'});
    }
   
}
