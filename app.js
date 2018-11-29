const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const logger = require("morgan");
const exphbs = require("express-handlebars");
const methodOverride = require("method-override");
const cookieSession = require("cookie-session");
const passport = require("passport");
const cors = require("cors");

const passportSetup = require("./config/passport-setup");
const indexRouter = require("./routes/index");
const authRouter = require("./routes/auth-routes");
const keys = require("./config/keys");

const app = express();

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Credentials", true);
//   res.header("Access-Control-Allow-Origin", req.headers.origin);
//   res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept"
//   );
//   if (req.method === "OPTIONS") {
//     res.send(200);
//   } else {
//     next();
//   }
// });

app.use(cors());

// initialize passport
// app.use(
//   cors({
//     methods: ["GET", "POST"],
//     credentials: true
//   })
// );
// app.use(cookieParser("anything"));
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey]
  })
);
// app.use(cookieSession({ secret: "anything" }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());

// view engine setup
const hbs = exphbs.create({
  layoutsDir: "views/layouts",
  partialsDir: "views/partials",
  defaultLayout: "layout",
  extname: "hbs"
});
app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));

app.use("/", indexRouter);
app.use("/auth", authRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
