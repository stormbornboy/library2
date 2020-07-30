var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/user');

module.exports = function (passport) {
	passport.serializeUser(function (user, done) {
		done(null, user.id);
	});

	passport.deserializeUser(function (id, done) {
		User.findById(id, function (err, user) {
			done(err, user);
		});
	});
	passport.use('local-signup', new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password',
		passReqToCallback: true // allows us to pass back the entire request to the callback
	},
		function (req, email, password, done) {
			process.nextTick(function () {
				User.findOne({ 'email': email }, function (err, user) {
					if (err)
						return done(err);
					if (user) {
						return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
					}else {
						User.findOne({username : req.username}, function (err ,user) {
							if (err) {
								return done(err);
							}
							if (user) {
								return done(null, false , req.flash('signupMessage', 'That username is already taken.'));
							}else {
								
								var { error, value } = User.validateUser(req.body)
								if (error)
									return done(null, false, req.flash('signupMessage', error.details[0].message));
								var newUser = new User(value);
								newUser.password = newUser.generateHash(password);
								newUser.save(function (err) {
									if (err)
										return done(null, false, req.flash('signupMessage', err.message));
									return done(null, newUser);
								});
								
							}
							
						});
					}
					  

				});

			});

		}));

	passport.use('local-login', new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password',
		passReqToCallback: true
	},
		function (req, email, password, done) {

			process.nextTick(function () {

				User.getUserByEmail(email, function (err, user) {
					if (err)
						return done(err);
					if (!user)
						return done(null, false, req.flash('loginMessage', 'No user found.'));

					if (!user.validPassword(password))
						return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));

					return done(null, user);
				});

			});


		}));


};