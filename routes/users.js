module.exports = function (app, passport) {

    app.get('/users/login', function (req, res) {
        res.render('login', { message: req.flash('loginMessage') , user : req.user });
    });

    app.post('/users/login', function (req, res, next) {
        console.log(req.body);
        next()
    }, passport.authenticate('local-login', {
        successRedirect: '/weblog', // redirect to the secure profile section
        failureFlash: true,// allow flash messages
        failureRedirect: '/users/login', // redirect back to the signup page if there is an error
    }));

    app.get('/users/register', function (req, res) {
        res.render('signup', { message: req.flash('signupMessage'), user : req.user });
    });

    app.post('/users/register', passport.authenticate('local-signup', {
        successRedirect: '/users/login',
        failureFlash: true,
        failureRedirect: '/users/register'
    }));
    // app.get(/users/)

    // app.get('/users/profile', isLoggedIn, function (req, res) {
    //     res.render('profile.ejs', {
    //         user: req.user
    //     });
    // });

    app.get('/users/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });
};

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}