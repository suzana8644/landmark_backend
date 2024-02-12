// Assuming Decoration is the Mongoose model for decorations
const Decoration = require('../models/Decoration');

exports.createDecoration = async (req, res) => {
    try {
	    console.log(req.body);
        const newDecoration = new Decoration(req.body);
        const savedDecoration = await newDecoration.save();
        res.status(201).json(savedDecoration);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getAllDecorations = async (req, res) => {
    try {
        const decorations = await Decoration.find();
        res.json(decorations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getDecorationById = async (req, res) => {
    try {
        const decoration = await Decoration.findById(req.params.id);
        if (decoration) {
            res.json(decoration);
        } else {
            res.status(404).json({ message: 'Decoration not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateDecoration = async (req, res) => {
    try {
        const updatedDecoration = await Decoration.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true } // Return the updated object
        );
        if (updatedDecoration) {
            res.json(updatedDecoration);
        } else {
            res.status(404).json({ message: 'Decoration not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteDecoration = async (req, res) => {
    try {
        const decoration = await Decoration.findByIdAndDelete(req.params.id);
        if (decoration) {
            res.json({ message: 'Decoration successfully deleted' });
        } else {
            res.status(404).json({ message: 'Decoration not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getDecorationsByDecorator = async (req, res) => {
    try {
        const decoratorId = req.params.decoratorId;
        const decorations = await Decoration.find({ decoratorId });
        res.json(decorations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
