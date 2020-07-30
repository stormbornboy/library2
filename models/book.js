var mongoose = require('mongoose');
const Schema = mongoose.Schema;
var Author = require('../models/author');
var Category = require('../models/category');

const Joi = require('joi');
const ColName = 'book'
const perPage = 10

var BookSchema = mongoose.Schema({
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
  Author: { type: Schema.Types.ObjectId, ref: 'author' },
  Translator: {
    type: String,
    minlength: 5,
    maxlength: 255
  },
  ImagePath: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024
  },
  Category: { type: Schema.Types.ObjectId, ref: 'category' },
  CreatedAt: {
    type: Date,
    required: false,
    default: Date.now,
  },
  Meta: {
    Views: {
      type: Number,
      required: false,
      default: 0,
    },
    Borrows: {
      type: Number,
      required: false,
      default: 0,
    },
    CanRent: {
      type: Boolean,
      required: false,
      default: true,
    },
    Reserve: {
      User: { type: Schema.Types.ObjectId, ref: 'user' },
      Until: {
        type: Date,
        required: false,
        default: Date.now,
      },
      Rented: {
        type: Date,
        required: false,
        default: Date.now,
      },
      Set: {
        type: Number,
        required: false,
        default: 1,
      }
    }
  }
});



var Book = module.exports = mongoose.model(ColName, BookSchema);

module.exports.getBookById = function (id, callback) {
  Book.findById(id, callback);
}

module.exports.getBookByBookname = function (Bookname, callback) {
  var query = { Name: Bookname };
  Book.findOne(query, callback);
}
module.exports.getBookByCategory = async function (CategoryId, callback) {
  var query = { Category: CategoryId };
  return await Book.find(query).populate('Author').populate('Category');
}

module.exports.getBookByMeta = async function (Meta, page, perPage = perPage) {
  page--;
  return await Book.find({}, null, {
    skip: page * perPage,
    limit: perPage
  }).sort([['Meta.' + Meta, 'descending']]).populate('Author').populate('Category');
}

module.exports.GetUserReservedBooks = async function (id, callback) {
  var query = {
    'Meta.CanRent': "false",
    'Meta.Reserve.User': id
  };
  return await Book.find(query);
}

module.exports.validateBook = function (book) {
  const JoiSchema = Joi.object({
    Name: Joi.string().min(5).max(255).required(),
    About: Joi.string().min(20).required(),
    Category: Joi.string().min(5).max(255).required(),
    Translator: Joi.string().min(5).max(255).required(),
    Author: Joi.string().min(5).max(60).required()

  });

  return JoiSchema.validate(book, { abortEarly: false });
}
mongoose.connection.on('connected', function () {
  Book.count(async function (err, count) {
    if (count == 0 && !err) {
      seedBooks = []
      // let author = await Author.findOne()
      let category = await Category.findOne({ Name: 'موضوعی' })
      seedBooks.push(
        new Book({//#FillUP
          Name: "گتسبی بزرگ",
          Author: (await Author.findOne({Name:"اف. اسکات فیتزجرالد"}))._id,
          About: "گتسبی بزرگ اثر جاویدان اسکات فیتز جرالد و به نقل از تایمز، یکی از شاخص‌ترین آثار ادبی امریکا است. این کتاب جزو صد کتاب برتر جهان قرار دارد. رضا رضایی این اثر فاخر از ادبیات کلاسیک امریکا را به فارسی بازگردانده است اسکات فیتز جرالد در کتاب گتسبی بزرگ خاطره‌ای جاویدان از هوس، هرزگی و تباهی و بی‌قیدی که همه و همه در ثروت نهفته است را روایت می‌کند. این داستان در نیویورک و در لانگ آیلند، و زمانی اتفاق می‌افتد که فیتزجرالد آن را عصر موسیقی جاز می‌نامد. در سال ۱۹۲۲ که ایالات متحده دورانی از رشد اقتصادی را پس از جنگ جهانی اول می‌گذرانید. در این دوره بر تعداد میلیونرهای ایالات متحده افزوده شد و گتسبی یک از این میلیونرها بود. نیک کراوی از اهالی غرب میانه که به سواحل شرقی امریکا کوچ کرده‌‌است همسایه گتسبی می‌شود. گتسبی بزرگ و ثروتمند است و به خاطر مهمانی‌های باشکوهش معروف شده‌است. در میان مردم شایعاتی درباره شیوه پولدار شدن او وجود دارد ولی کسی نمی‌داند ثروت او از کجا آمده‌است. نیک ابتدا از این همه مهمانی پر زرق و برق همسایه‌اش دل خوشی ندارد اما کم کم خودش به یکی از مهمانان تبدیل می‌شود و می‌تواند به گتسبی نزدیک شود و پی به راز میهمانی‌های هر شنبه او ببرد. گتسبی بزرگ عاشق است و این میهمانی‌ها را به شوق این برگزار می‌کند که معشوق شبی پا به خانه‌اش بگذارد. نیک زن مورد علاقه گتسبی را می‌شناسد پس شروع به تحقیق و پرس و جو درباره گذشته این مرد می‌کند.در سال ۲۰۱۳ از روی این اثر فیلمی به کارگردانی باز لورمن و با بازی لئوناردو دی‌کاپریو ساخته شد که توانست جازه اسکار بهترین طراحی صحنه و لباس را به دست آورد.",
          Translator: "رضا رضایی",
          ImagePath: "/images/image04.jpg",
          Category: category.id,
          Meta: {
            views: 1,
            borrows: 10
          }
        }),
        new Book({//#FillUP
          Name: "روایت یک مرگ در خانواده",
          Author: (await Author.findOne({Name:"جیمز روفاس"}))._id,
          About: "«روایت یک مرگ در خانواده» نوشته جیمز روفاس ایجی(۱۹۵۷-۱۹۰۹)، نویسنده امریکایی است. «روایت یک مرگ در خانواده»، زیبایی و درام‌گونگی ساده یک شعر مردمی را دارد. «روایت یک مرگ در خانواده» بازخوانی ماجرای کودکی جیمز روفاس ایجی در ناکسویلِ تنسی، امریکای ۱۹۱۵ است. ایجی در این رمان، از زوایای مختلف که زاویه‌ دید سوم‌شخص محدود به اعضای خانواده است، در چهل‌وهشت ساعت - از یک روز پیش از مرگ مرگ جی تا ‌روز مرگِ جی- روایتگر «مرگ» و «زندگی» در «خانواده» است. خانواده‌ جی، شامل مری همسر جی و دو فرزندش روفاس پسر بزرگ و شش ساله که در اصل خود نویسنده است و کاترین سه ساله است. «ایجی» با حساسیت تاثیر مرگ را بر هر یک از افراد داستان نشان می‌دهد و رمانی خلق می‌کند که سرشار از احساسات واقعی است. این کتاب اثری شاعرانه است که یکدستی و قدرت آن برگرفته از داستانی ساده و دراماتیک است که با تکامل موسیقایی ماهرانه‌ای پیش می‌رود. نخستین بخش از این رمان سه‌قسمتی سرشار از شادی‌ای است که با سختی دردآور فرار از تنهایی و انتقال این شادی به عزیزان پررنگ می‌شود.",
          Translator: "شیرین معتمدی",
          ImagePath: "/images/image03.jpg",
          Category: category.id,
          Meta: {
            views: 1,
            borrows: 10
          }
        }),
        new Book({//#FillUP
          Name: "قلعه حیوانات",
          Author: (await Author.findOne({Name:"ج‍رج‌ اورول"}))._id,
          About: "داستان درباره‌ی گروهی از جانوران اهلی است که در اقدامی آرمان‌گرایانه و انقلابی، صاحب مزرعه (آقای جونز) را از مزرعه‌اش فراری می‌دهند تا خود اداره‌ی مزرعه را به‌دست گرفته و «برابری» و «رفاه» را در جامعه‌ی خود برقرار سازند. رهبری این جنبش را گروهی از خوک‌ها به‌دست دارند، ولی پس از مدتی این گروه جدید نیز به رهبری خوکی به نام ناپلئون همچون آقای جونز به بهره‌کشی از حیوانات مزرعه می‌پردازند و هرگونه مخالفتی را سرکوب می‌کنند.",
          Translator: "احمد کسایی پور",
          ImagePath: "/images/image01.png",
          Category: category.id,
          Meta: {
            views: 1,
            borrows: 10
          }
        }),
        new Book({//#FillUP
          Name: "ناطور دشت (ناتور دشت)",
          Author: (await Author.findOne({Name:"جروم دیوید سالینجر"}))._id,
          About: "معرفی کتاب ناطور دشت (ناتور دشت) ناطور دشت (ناتور دشت) رمانی به قلم نویسنده آمریکایی جروم دیوید سالینجر است. آراز بارسقیان مترجم این کتاب می‌گوید: ناطورِ دشت داستان آدمی است شبیه من و خودت. روایت زندگی پسر جوانی که سعی دارد تو این دنیای نکبتی، پیچ‌وخم‌های زندگی را از سر بگذراند و ببیند آخرسر کجای این دنیا باید وایستد. بسیاری از منتقدان ادبی معتقدند سلینجر این اثر را در نقد به جامعه مدرن غرب، به‌ویژه آمریکا نوشته است." + "ناطورِ دشت نوشته نویسنده آمریکایی دیوید سالینجر است و در آن داستان پسر جوانی روایت می‌شود که سعی دارد تو این دنیای نکبتی، مشکلات را پشت سر بگذارد و ببیند کجای این دنیا قرار دارد. پسر جوان داستان سلینجر، هولدن کالفیلد نام دارد. پس از انتشار ناطور دشت در سال ۱۹۵۱، هولدن کالفیلد به دومین شخصیت معروف داستانی جهان تبدیل شد. هولدن با جهان خود بیگانه است. او مظهر جوانانی است که در هر جای این دنیا ممکن است زندگی کنند. جوانانی که فشارها و تنش‌هایی از قبیل زندگی کردن مطابق قوانین، تلاش برای رهایی از ارتباطات بی‌معنای انسانی و محدود کردن شخصیتشان، آنان را از هر طرف احاطه کرده است. باید خاطرنشان ساخت ناطور دشت با روایت شیرین سلینجر و ترجمه خاص آراز بارسقیان آنقدر دلنشین است که خواننده کاملا با شخصیت آن، که در جست‌وجوی مفهوم واقعی زندگی است هم‌دل و هم فکر می‌شود.",
          Translator: "آراز بارسقیان",
          ImagePath: "/images/image02.jpg",
          Category: category.id,
          Meta: {
            views: 1,
            borrows: 10
          }
        }),
        
        )


      category.Books.unshift(seedBooks[0])
      category.save();
      Book.insertMany(seedBooks, (err, docs) => {
        if (!err) {
          console.log("Books Seeded DB...");
        } else {
          console.log("[!] Book Seed Error : " + err);
        }
      })
    }
  })
});
