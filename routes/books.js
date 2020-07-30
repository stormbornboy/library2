
const Author = require('../models/author');
const Book = require('../models/Book');
const moment = require('moment');

module.exports = function (app, passport) {

    app.get('/books/:id', async function (req, res) {//#Done
        try {
            let book = await Book.findById(req.params.id).populate('Author').populate('Category')
            if (book) {
                res.render('books', { user: req.user, book });
            } else {
                res.redirect('/')
            }
        } catch (error) {
            res.redirect('/')

        }
    })


    app.get('/books/search/:name', function (req, res) {//search by name
        let bookId = "" + req.params.name;
        res.render(book, { user: req.user });
    })


    app.get('/books/:id/reserve', async function (req, res) {//#Done
        try {
            let book = await Book.findById(req.params.id).populate('Author').populate('Category')
            if (book) {
                let canRes = true;
                if (book.Meta.Reserve && book.Meta.Reserve.Until > Date.now()) {
                    req.flash('error', `متاسفانه این کتاب تا تاریخ ${book.Meta.Reserve.Until} رزرو شده است!`)
                    canRes = false
                }
                if (!req.user) {
                    req.flash('error', `لطفا ابتدا ثبت نام کنید/وارد شوید`)
                    canRes = false
                }
                else if (book.Meta.Reserve.User == req.user.id) {
                    req.flash('error', `شما این کتاب را رزرو کرده اید`)
                    canRes = false
                }

                if (canRes) {
                    book.Meta.Reserve.Until = moment().add('days', 15)
                    book.Meta.Reserve.Set = 1
                    book.Meta.Reserve.User = req.user
                    book.Meta.CanRent = false
                    await book.save()
                    try {
                        let newbook = await book.save()
                        req.flash('success', `این کتاب تا ${newbook.Meta.Reserve.Until} برای شما رزرو شد`)
                    } catch (error) {
                        req.flash('error', `مشکلی در رزرو کتاب پیش امده است`)
                    }
                }

                res.render('books', {
                    user: req.user,
                    book,
                    errors: req.flash('error'),
                    successes: req.flash('success')
                });
            } else {
                res.redirect('/')
            }
        } catch (error) {
            res.redirect('/')

        }
    })
};

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    res.redirect('/');
}