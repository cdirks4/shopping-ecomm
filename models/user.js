const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;
const SALT_ROUNDS = 11;

const userSchema = new Schema(
	{
		name: { type: String, required: true },
		email: {
			type: String,
			unique: true,
			trim: true,
			lowercase: true,
			required: true,
		},
		password: {
			type: String,
			trim: true,
			minLength: 3,
			required: true,
		},
	},
	{
		timestamps: true,
		toJSON: {
			transform: function (doc, ret) {
				delete ret.password;
				return ret;
			},
		},
	}
);

userSchema.pre('save', function (next) {
	// Save the reference to the user doc
	const user = this;
	if (!user.isModified('password')) return next();
	// if users password has been changed salt and hash it
	bcrypt.hash(user.password, SALT_ROUNDS, function (err, hash) {
		if (err) return next(err);
		// replace the previous pasword with the new one
		user.password = hash;
		return next();
	});
});

module.exports = mongoose.model('User', userSchema);
