const jwt = require('jsonwebtoken');
const User = require('../models/user');
const bcrypt = require('bcrypt');

module.exports = {
	create,
};

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
