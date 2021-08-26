const jwt = require('jsonwebtoken');
const User = require('../models/user');
const bcrypt = require('bcrypt');

module.exports = {
	create,
	index,
	login,
	update,
};

async function index(req, res) {
	try {
		const users = await User.find({});
		res.json(users);
	} catch (err) {
		res.json(err);
	}
}

async function create(req, res) {
	try {
		const user = await User.create(req.body);
		const token = createJWT(user);
		console.log(token);
		res.json(token);
	} catch (err) {
		console.log(err);
		res.status(400).json(err);
	}
}

async function login(req, res) {
	try {
		const user = await User.findOne({ email: req.body.email });
		console.log(user);
		if (!user) throw new Error('No user with corresonding email');
		const match = await bcrypt.compare(req.body.password, user.password);
		if (match) {
			const token = createJWT(user);
			res.json(token);
		} else {
			throw new Error('password did not match the username');
		}
	} catch (err) {
		res.json(err);
	}
}

async function update(req, res) {
	try {
		const user = await User.findOne({ email: req.body.email });
		if (!user) throw new Error('No user with corresonding email');
		const match = await bcrypt.compare(req.body.password, user.password);
		console.log(match);
		if (match) {
			req.body.newName && (user.name = req.body.newName);
			req.body.newEmail && (user.email = req.body.newEmail);
			req.body.newPassword && (user.password = req.body.newPassword);
			user.save();
			res.json(user);
		} else {
			throw new Error('password did not match the username');
		}
	} catch (err) {
		res.json(err);
	}
}

function createJWT(user) {
	return jwt.sign(
		// data payload
		{ user },
		process.env.SECRET,
		// specify how long the JWT lasts
		{ expiresIn: '7d' }
	);
}
