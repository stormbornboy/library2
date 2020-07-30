var mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Joi = require('joi');
const ColName = 'category'

var CategorySchema = mongoose.Schema({
    Name: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        minlength: 3,
        maxlength: 255
    },
    count: Number,
    Books: [{ type: Schema.Types.ObjectId, ref: 'book' }],

});

var Category = module.exports = mongoose.model(ColName, CategorySchema);

module.exports.getCategoryById = function (id, callback) {
    Category.findById(id, callback);
}

module.exports.getCategoryByCategoryname = function (Categoryname, callback) {
    var query = { Name: Categoryname };
    Category.findOne(query, callback);
}

module.exports.validateCategory = function (Category) {
    const JoiSchema = Joi.object({
        Name: Joi.string().min(5).max(255).required()
    });

    return JoiSchema.validate(Category, { abortEarly: false });
}

mongoose.connection.on('connected', function () {
    Category.count(function (err, count) {
        if (count == 0 && !err) {
            console.log("No Found Records.");
            seedCategory = []
            names = ["موضوعی",
                "تاریخی",
                "ادواری",
                " سمعی",
                " دیجیتالی",
                " آموزشی",
                " بصری"]
            names.forEach(Name => {
                seedCategory.push(new Category({//#FillUP
                    Name,
                    count: 120 + Math.random() * 200
                }))
            });

            Category.insertMany(seedCategory, (err, docs) => {
            })
        }
    })
});