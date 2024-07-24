const passport = require('passport');
const config = require('../config');

const DiscordStrategy = require('passport-discord').Strategy;

const scopes = ['identify', 'email', 'guilds', 'guilds.join'];

passport.use(new DiscordStrategy({
    clientID: config.oauth.discord.id,
    clientSecret: config.oauth.discord.secret,
    callbackURL: "https://luarzito.devluar.com/callback",
    scope: scopes
},
    function (accessToken, refreshToken, profile, cb) {
        console.log(profile)
        /**
         *  User.findOrCreate({ discordId: profile.id }, function(err, user) {
             return cb(err, user);
         });
         */
        return cb(err, user);
    }));

module.exports = passport;