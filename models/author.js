var mongoose = require('mongoose');

const Joi = require('joi');
const ColName = 'author'
const perPage = 10

var AuthorSchema = mongoose.Schema({
    Name: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        minlength: 5,
        maxlength: 255
    },
    About: {
        type: String,
        required: false,
        minlength: 20,
    },
    ImagePath: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    },
    CreatedAt: {
        type: Date,
        required: false,
        default: Date.now,
    }
});



var Author = module.exports = mongoose.model(ColName, AuthorSchema);

module.exports.getAuthorById = function (id, callback) {
    Author.findById(id, callback);
}

module.exports.getAuthorByAuthorname = function (Authorname, callback) {
    var query = { Name: Authorname };
    Author.findOne(query, callback);
}

module.exports.getAuthorByMeta = function (Meta, page, callback) {
    Author.find({}, null, {
        skip: page * perPage,
        limit: perPage
    }).sort([['Meta.' + Meta, 'descending']]).exec(callback);
}

module.exports.validateAuthor = function (Author) {
    const JoiSchema = Joi.object({
        Name: Joi.string().min(5).max(255).required(),
        About: Joi.string().min(20).required(),
    });

    return JoiSchema.validate(Author, { abortEarly: false });
}
mongoose.connection.on('connected', function () {
    Author.count(function (err, count) {
        if (count == 0 && !err) {
            seedAuthors = []

            seedAuthors.push(
                new Author({//#FillUP
                    Name: "اف. اسکات فیتزجرالد",
                    About: "فرانسیس اسکات کی فیتزجرالد (به انگلیسی: Francis Scott Key Fitzgerald) (زاده ۲۴ سپتامبر ۱۸۹۶ – درگذشته ۲۱ دسامبر ۱۹۴۰) نویسنده آمریکایی رمان و داستان‌های کوتاه بود. آثار فیتزجرالد نمایانگر عصر جاز در آمریکا است.[۱] او به عنوان یکی از نویسندگان بزرگ سده بیستم میلادی شناخته می‌شود. شناخته‌شده‌ترین اثر او رمان گتسبی بزرگ است که اولین بار در سال ۱۹۲۵ منتشر شد.",
                    ImagePath: "/images/image06.jpg",
                }),
                new Author({//#FillUP
                    Name: "جیمز روفاس",
                    About: "جیمز ایجی (James Rufus Agee)، با دو شاهکارش «روایت یک مرگ در خانواده» و «بیایید مردان مشهور را ستایش کنیم» توانست نام خود را در ادبیات جهان جاودانه کند. ایجی یک ‌سال پس از مرگ نابهنگامش، جایزه‌ی پولیتزر 1958 را برای رمان «روایت یک مرگ در خانواده» از آن خود کرد. هر دو شاهکار ایجی در سال‌های 1999 و 2005 از سوی کتابخانه‌ آمریکا و نشریات معتبر لوموند و تایم در فهرست صد رمان بزرگ قرن بیستم قرار گرفت. تاد موسل نمایش‌نامه‌نویس بزرگ آمریکایی در 1960 بر اساس رمان «روایت یک مرگ در خانواده»، نمایش‌نامه‌ای با عنوان «راه خانه» نوشت که توانست جایزه‌ی پولیتزر نمایش‌نامه‌نویسی را دریافت کند. سه سال بعد نیز فیلمی به کارگردانی فیلیپ اچ. ریسمن براساس این نمایش‌نامه در همان منطقه‌ای که کودکی ایجی در آن‌جا سپری شده بود ساخته شد. ایجی، علاوه بر نوشتن رمان، منتقد سینمایی (مجله‌های تایم، لایف و فورچون) و فیلم‌نامه‌نویس برجسته‌ای نیز بود.",
                    ImagePath: "/images/rofas.jpg",
                }),
                new Author({//#FillUP
                    Name: "جروم دیوید سالینجر",
                    About: "جروم دیوید سالینجر، نویسنده معاصر آمریکایی در سال ۱۹۱۹ در منهتن نیویورک از پدری یهودی و مادری مسیحی (که پس از ازدواج با پدرش به یهودیت گروید) به دنیا آمد. نخستین اثر سالینجر به نام جوانان در سال ۱۹۴۰ در مجله استوری چاپ شد. چند سال بعد (طی سال‌های ۱۹۴۵ و ۱۹۴۶)، داستان ناطور دشت به شکل دنباله‌دار در آمریکا منتشر شد و سپس در سال ۱۹۵۱ روانه بازار کتابِ این کشور و بریتانیا شد. این کتاب در مدت کمی شهرت و محبوبیت فراوانی برای سالینجر به همراه آورد. البته این کتاب در مناطقی از آمریکا به‌عنوان کتاب غیراخلاقی معرفی شد و در فهرست کتاب‌های ممنوعه دهه ۱۹۹۰ منتشرشده از سوی «انجمن کتابخانه‌های آمریکا» ــ قرار گرفت. از دیگر آثار این نویسنده می‌توان به فرانی و زویی، نُه داستان (دلتنگی‌های نقاش خیابان چهل و هشتم)، تیرهای سقف را بالا بگذارید نجاران و سیمور، جنگل واژگون، نغمه غمگین، هفته‌ای یه بار آدمو نمی‌کشه و یادداشت‌های شخصی یک سرباز اشاره کرد.",
                    ImagePath: "/images/images07.jpg",
                }),
                new Author({//#FillUP
                    Name: "ج‍رج‌ اورول",
                    About: "اریک آرتور بلر با نام مستعار جورج اورول در ۲۵ ژوئن ۱۹۰۳ در شهر موتیهاری، بیهار در هند متولد شد. او داستان‌نویس، روزنامه‌نگار، منتقدِ ادبی و شاعر انگلیسی بود که بیشتر برای دو رمان سرشناس و پرفروشش مزرعه حیوانات و رمان ۱۹۸۴ می‌شناسند. هر دوی این کتاب‌ها به وضعیت حکومت‌های دیکتاتوری می‌پردازند. جرج اورول مدتی به عنوان پلیس سلطنتی هند در برمه فعالیت می‌کرد اما زندگی در هند و انگلیس سبب شد تا با فقر آشنا شود و این آشنایی دیدگاهی جدید به او و کارهایش بخشید. کتاب‌های آس و پاس در لندن و پاریس و دختر کشیش حاصل همین تجربیات او هستند. اورول در در دهه ۱۹۳۰ به اسپانیا رفت تا علیه ارتش فاشیست ژنرال فرانکو بجنگد. کمی بعدتر به دلیل بیماری مزمن ریوی که به آن مبتلا بود در بیمارستان بستری شد و هفت ماه پس از چاپِ کتابِ ۱۹۸۴، در ۲۱ ژانویه ۱۹۵۰ از دنیا رفت.",
                    ImagePath: "/images/image07.jpg",
                }),
                )

            Author.insertMany(seedAuthors, (err, docs) => {
                if (!err) {
                    console.log("Author Seeded DB...");
                } else {
                    console.log("[!] Author Seed Error : " + err);
                }
            })
        }
    })
});
