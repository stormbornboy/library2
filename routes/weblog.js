
var Weblog = require('../models/weblog');
const Joi = require('joi');

const moment = require('moment');
const weblog = require('../models/weblog');

module.exports = function (app, passport) {
    app.get('/weblog', async function (req, res) {
        let page = req.query.page ? req.query.page : 1;
        let weblogs = await Weblog.getWeblogByPage(page)
        let total = await weblog.count();
        // weblogs.forEach(e => e.HTML = e.HTML.split('<p>').slice(0, 3).join(''))

        // console.log(weblogs[0].HTML)


        res.render("weblog", { user: req.user, weblogs, totalPages: total / Weblog.perPage, page });
    });
    app.get(['/weblog/:id', '/weblog/:id/comment'], async function (req, res) {
        try {
            let weblog = await Weblog.findById(req.params.id)
            if (weblog) {

                res.render("log", { user: req.user, weblog });
            } else {
                req.flash('error', 'وبلاگ مورد نظر پیدا نشد')
                throw null;
            }
        } catch (error) {
            res.redirect("/", {
                errors: req.flash('error'),
                successes: req.flash('success')
            });
        }


    });
    app.post('/weblog/:id/comment', async function (req, res) {
        try {
            let weblog = await Weblog.findById(req.params.id)
            if (weblog) {

                const JoiSchema = Joi.object({
                    username: Joi.string().min(5).max(16).required(),
                    email: Joi.string().email().min(5).max(50).required(),
                    content: Joi.string().min(3).max(100).required(),
                });

                let { error, value } = JoiSchema.validate(req.body, { abortEarly: false });
                if (error) {
                    error.details.forEach(err => {
                        req.flash('error', err.message)
                    });
                    res.render("log", {
                        user: req.user, weblog,
                        errors: req.flash('error'),
                        successes: req.flash('success')
                    });
                    // res.location("../",z)
                } else {
                    weblog.Comments.unshift(value);
                    await weblog.save();
                    req.flash('success', 'پیام شما با موفقیت ثبت شد')
                    res.render("log", {
                        user: req.user, weblog,
                        errors: req.flash('error'),
                        successes: req.flash('success')
                    });
                }

            } else {
                req.flash('error', 'وبلاگ مورد نظر پیدا نشد')
                throw null;
            }
        } catch (error) {
            console.log(error);
            req.flash('error', error.message)
            res.redirect('..');
        }


    });
};

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    res.redirect('/');
}