require("dotenv").config();

const path = require("path");
const express = require("express");
const expressSession = require("express-session");
const pgSession = require("connect-pg-simple")(expressSession);

const pool = require("./db/pool");
const initializePassport = require("./config/passport");
const passport = require("passport");
const userMiddleware = require("./middleware/userMiddleware");
const errorMiddleware = require("./middleware/errorMiddleware");
const isAuth = require("./middleware/authMiddleware");

const sessionStore = new pgSession({ pool: pool });

const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(expressSession({
  secret: process.env.SECRET,
  store: sessionStore,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }
}));

initializePassport();

app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

app.use(userMiddleware);

// routers

const homeRouter = require("./routes/homeRouter");

app.use("/", homeRouter);

const authRouter = require("./routes/authRouter");

app.use("/auth", authRouter);

const membershipRouter = require("./routes/membershipRouter");

app.use("/membership", isAuth, membershipRouter);

const postRouter = require("./routes/postRouter");

app.use("/post", isAuth, postRouter);

const adminRouter = require("./routes/adminRouter");

app.use("/admin", isAuth, adminRouter);

app.get("/{*splat}", (req, res) => {
  res.status(404).render("404");
})

app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;

app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }

  console.log(`✅ Server running at PORT : ${PORT}`);
});




