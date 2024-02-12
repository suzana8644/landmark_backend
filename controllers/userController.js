const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Handle user registration
exports.registerUser = async (req, res) => {
    try {
        const {
            username,
            firstName,
            lastName,
            email,
            password,
            role,
        } = req.body;
        // Check if user already exists
        let user = await User.findOne({username});
        if (user) {
            return res.status(400).json({message: 'User already exists'});
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        user = new User({
            username,
            firstName,
            lastName,
            email,
            password: hashedPassword,
            role,
            //profile
        });

        await user.save();
        res.status(201).json({message: 'User registered successfully'});
    } catch (error) {
        res.status(500).json({message: 'Error registering user', error: error.message});
    }
};

// Handle user login
exports.loginUser = async (req, res) => {
    try {
        const {username, password} = req.body;

	    console.log('body', req.body);
        // Check if user exists
        const user = await User.findOne({username});
        if (! user) {
            return res.status(400).json({message: 'Invalid credentials'});
        }
	console.log('user', user);
        // Validate password
        const isMatch = await bcrypt.compare(password, user.password);
        if (! isMatch) {
            return res.status(400).json({message: 'Invalid credentials'});
        }

        // Create JWT payload
        const payload = {
            user: {
                firstName: user.firstName,
                lastName: user.lastName,
                id: user.id,
                role: user.role,
            }
        };

        // Sign token
        jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '5h'
        }, (error, token) => {
            if (error) 
                throw error;
	    console.log('done');
            res.send(token);
        });
    } catch (error) {
        res.status(500).json({message: 'Error logging in user', error: error.message});
    }
};

// Get user profile by ID
exports.getUserProfile = async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId);
        if (! user) {
            return res.status(404).json({message: 'User not found'});
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({message: 'Error fetching user profile', error: error.message});
    }
};

// Update user profile
exports.updateUserProfile = async (req, res) => {
    try {
        const userId = req.params.userId;
        const updates = req.body;

        const user = await User.findByIdAndUpdate(userId, updates, {new: true});
        if (! user) {
            return res.status(404).json({message: 'User not found'});
        }
        res.json({message: 'User profile updated', user});
    } catch (error) {
        res.status(500).json({message: 'Error updating user profile', error: error.message});
    }
};

