const jwt = require('jsonwebtoken');
const User = require('../models/user');
const bcrypt = require('bcrypt');

module.exports = {
	create,
	index,
};

async function index(req, res) {
	try {
		const users = await User.find({});
		console.log(users);
		res.json(users);
	} catch (err) {
		res.json(err);
	}
}

async function create(req, res) {
	try {
		console.log('hi');
		const user = await User.create(req.body);
		const token = createJWT(user);
		res.json(token);
	} catch (err) {
		console.log(err);
		res.status(400).json(err);
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
