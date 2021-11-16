const router = require("express").Router();
const User = require('../models/User.model');
const bcrypt = require('bcrypt');

router.get("/signup", (req, res, next) => {
	res.render("signup");
});

router.post('/signup', (req, res, next) => {
	const { username, password } = req.body
	// is the password 4 + characters
	if (password.length < 4) {
		// validation failed -> we show the signup form again with a message
		res.render('signup', { message: 'Your password needs to be 4 chars min' })
		return
	}
	// is the username not empty
	if (username.length === 0) {
		res.render('signup', { message: 'Your username cannot be empty' })
		return
	}
	// validation (format) passed
	// do we already have a user with that username?
	User.findOne({ username: username })
		.then(userFromDB => {
			// if there is a user
			if (userFromDB !== null) {
				res.render('signup', { message: 'Your username is already taken' })
			} else {
				// the username can be used
				// we hash the password 
				const salt = bcrypt.genSaltSync();
				const hash = bcrypt.hashSync(password, salt)
				// create the user
				User.create({ username: username, password: hash })
					.then(createdUser => {
						console.log(createdUser)
						res.redirect('/')
					})
					.catch(err => next(err))
			}
		})
});


module.exports = router;