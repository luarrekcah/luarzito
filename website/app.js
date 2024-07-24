const express = require("express");
const helmet = require("helmet");
const xss = require("xss-clean");
const compression = require("compression");
const cors = require("cors");
const passport = require("passport");
const httpStatus = require("http-status");
const config = require("./config");
const morgan = require("./config/morgan");
const { authLimiter } = require("./middlewares/rateLimiter");
const routes = require("./routes");
const { errorConverter, errorHandler } = require("./middlewares/error");
const ApiError = require("./utils/ApiError");
const i18n = require('i18n-express');
const path = require("path");
const cookieParser = require('cookie-parser');
const session = require("express-session");

const app = express();

if (config.env !== "test") {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}

app.use(i18n({
  translationsPath: path.join(__dirname, 'i18n'),
  siteLangs: ["pt", "en"],
  textsVarName: 'translation'
}));

app.use(express.static(path.join(__dirname, "/public")));
app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");

app.use(cookieParser());

// set security HTTP headers
// app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(xss());

// gzip compression
app.use(compression());

// enable cors
app.use(cors());
app.options("*", cors());

// authentication
app.use(
  session({
    secret: config.oauth.secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 10800000,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

require("./auth/discord.strategy");

// limit repeated failed requests to auth endpoints
if (config.env === "production") {
  app.use("/auth", authLimiter);
}

// routes
app.use("/", routes);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  // next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
  res.sendStatus(404)
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

module.exports = app;
