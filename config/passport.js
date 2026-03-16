const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const db = require("../db/queries");

const initializePassport = () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password"
      },
      async (email, password, done) => {
        try {
          const user = await db.getUserUsingEmail(email);

          if (!user) {
            return done(null, false, { message: "Incorrect Username" });
          }

          const match = await bcrypt.compare(password, user.password);
          if (!match) {
            return done(null, false, { message: "Incorrect Password" });
          }

          return done(null, user);

        } catch (err) {
          return done(err);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await db.getUserUsingID(id);

      done(null, user);
    } catch (err) {
      done(err);
    }
  });
};

module.exports = initializePassport;