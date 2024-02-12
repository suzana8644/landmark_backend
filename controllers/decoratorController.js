const Decorator = require('../models/Decorator');

// Create a new decorator profile
exports.createDecoratorProfile = async (req, res) => {
    try {
	    console.log('decorator body', req.body);
        const newDecorator = new Decorator(req.body);
        const savedDecorator = await newDecorator.save();
        res.status(201).json(savedDecorator);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get a decorator profile by User ID
exports.getDecoratorProfile = async (req, res) => {
    try {
        const decorator = await Decorator.findOne({ userId: req.params.userId });
        if (decorator) {
            res.json(decorator);
        } else {
            res.status(404).json({ message: 'Decorator profile not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a decorator profile
exports.updateDecoratorProfile = async (req, res) => {
    try {
        const updatedDecorator = await Decorator.findOneAndUpdate(
            { userId: req.params.userId },
            req.body,
            { new: true }
        );
        if (updatedDecorator) {
            res.json(updatedDecorator);
        } else {
            res.status(404).json({ message: 'Decorator profile not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getDecorators = async (req, res) => {
	try {
		const allDecorators = await Decorator.find().populate('userId').select({ id: 1, username: 1});

		return res.status(200).json(allDecorators);
	} catch(error) {
		res.status(500).json({ message: error.message });
	}
};

