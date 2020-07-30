const Book = require('../models/book');
var Weblog = require('../models/weblog');
const Category = require('../models/category');
const moment = require('moment');
const reservePeriod = 5//can reserve for 5 more dayes
const maxSetReservable = 2//can reserve for 5 more dayes
module.exports = function (app, passport) {
	app.get('*', async function (req, res, next) {
		let newBooks = await Book.find({}, null, { limit: 4 }).sort([['CreatedAt', 'descending']]).populate('Author').populate('Category');
		let popularBooks = await Book.getBookByMeta('Borrows', 1, 4);
		let Categories = await Category.find();
		let weblogs = await Weblog.find();

		res.locals.successes = req.flash('success');
		res.locals.errors = req.flash('error');
		res.locals.newBooks = newBooks;
		res.locals.popularBooks = popularBooks;
		res.locals.Categories = Categories;
		res.locals.weblogs = weblogs;
		next();
	});


	app.get('/', function (req, res) {

		res.render('index', { user: req.user });
	});
	app.get('/contact', function(req, res){
		
		res.render("contact", {user: req.user});
	});
	app.get('/tamdid', async function (req, res) {
		if (req.isAuthenticated()) {
			let userId = req.user.id
			let booksReserved = await Book.GetUserReservedBooks(req.user.id)

			let bookId = req.query.book;
			let book = await Book.findById(bookId)
			if (book) {
				let renewable = true;
				if (userId != book.Meta.Reserve.User) {
					renewable = false;
					req.flash('error', `شما این کتاب را ندارید لطفا ابتدا ان را رزروکنید`)
				}
				if (book.Meta.Reserve.Set > maxSetReservable) {
					renewable = false;
					req.flash('error', `متاسفانه شما  ${maxSetReservable}بار این کتاب را رزروکرده اید لطفا ان را عودت دهید تا بقیه نیز بتوانند از ان استفاده کنند`)
				}


				if (renewable) {
					book.Meta.Reserve.Until = moment(book.Meta.Reserve.Until).add(reservePeriod, 'days')
					book.Meta.Reserve.Set++;
					await book.save();
					req.flash('success', `کتاب ${book.Name}تا تاریخ ${book.Meta.Reserve.Until.toISOString().split('T')[0]} تمدید شد`)
				}

			}


			res.render("formtamdid", {
				user: req.user,
				booksReserved,
				errors: req.flash('error'),
				successes: req.flash('success')
			});
		} else {
			res.render("tamdid", { user: req.user });
		}
	});

	app.get('/return', async function (req, res) {
		if (req.isAuthenticated()) {
			let userId = req.user.id
			let booksReserved = await Book.GetUserReservedBooks(req.user.id)

			let bookId = req.query.book;
			let book = await Book.findById(bookId)
			if (book) {
				let returnable = true;
				if (userId != book.Meta.Reserve.User) {
					returnable = false;
					req.flash('error', `شما این کتاب را ندارید لطفا ابتدا ان را رزروکنید`)
				}
				if (returnable) {
					book.Meta.Reserve.Until = Date.now()
					book.Meta.CanRent = true
					book.Meta.Borrows++;
					await book.save();
					req.flash('success', `کتاب ${book.Name}با موفقیت عودت داده شد`)
				}

			}


			res.render("formtamdid", {
				user: req.user,
				booksReserved,
				errors: req.flash('error'),
				successes: req.flash('success')
			});
		} else {
			res.render("tamdid", { user: req.user });
		}
	});


	require('./users')(app, passport);
	require('./books')(app, passport);
	require('./weblog')(app, passport);
};

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}

	res.redirect('/');
}