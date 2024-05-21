// ./config/passport.js

const passport = require("passport");
const TwitterStrategy = require("passport-twitter").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const AppleStrategy = require("passport-apple");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const keys = require("./keys");
const User = require("../models/User");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secret;

module.exports = function (passport) {
  // Twitter Authentication Strategy
  passport.use(
    new TwitterStrategy(
      {
        consumerKey: keys.twitter.consumerKey,
        consumerSecret: keys.twitter.consumerSecret,
        callbackURL: keys.twitter.callbackURL,
      },
      (token, tokenSecret, profile, done) => {
        const { id, username } = profile;
        // Check if user exists in the database
        User.findOne({ username })
          .then((user) => {
            if (user) {
              return done(null, user);
            } else {
              // Create new user in the database
              const newUser = new User({
                username,
                // Add any other user information you want to store
              });
              newUser
                .save()
                .then((user) => done(null, user))
                .catch((err) => done(err));
            }
          })
          .catch((err) => done(err));
      }
    )
  );

  // Google Authentication Strategy
  passport.use(
    new GoogleStrategy(
      {
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret,
        callbackURL: keys.google.callbackURL,
        scope: ["profile", "email"],
      },
      (accessToken, refreshToken, profile, done) => {
        const { id, email, displayName } = profile;
        // Check if user exists in the database
        User.findOne({ email: profile.emails[0].value })
          .then((user) => {
            if (user) {
              return done(null, user);
            } else {
              // Create new user in the database
              const newUser = new User({
                username: displayName,
                email: profile.emails[0].value,
                // Add any other user information you want to store
              });
              newUser
                .save()
                .then((user) => done(null, user))
                .catch((err) => done(err));
            }
          })
          .catch((err) => done(err));
      }
    )
  );

  // Apple Authentication Strategy
  passport.use(
    new AppleStrategy(
      {
        clientID: keys.apple.clientID,
        teamID: keys.apple.teamID,
        callbackURL: keys.apple.callbackURL,
        keyID: keys.apple.keyID,
        privateKeyPath: keys.apple.privateKeyPath,
      },
      (accessToken, refreshToken, profile, done) => {
        const { id, email } = profile;
        // Check if user exists in the database
        User.findOne({ email })
          .then((user) => {
            if (user) {
              return done(null, user);
            } else {
              // Create new user in the database
              const newUser = new User({
                username: email.split("@")[0],
                email,
                // Add any other user information you want to store
              });
              newUser
                .save()
                .then((user) => done(null, user))
                .catch((err) => done(err));
            }
          })
          .catch((err) => done(err));
      }
    )
  );
  passport.use(
    new JwtStrategy(opts, async function (jwt_payload, done) {
      console.log(jwt_payload);
      try {
        const user = await User.findOne({ id: jwt_payload.id }).exec();

        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
          // or you could create a new account
        }
      } catch (err) {
        return done(err, false);
      }
    })
  );

  // Serialize and Deserialize User
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
};
