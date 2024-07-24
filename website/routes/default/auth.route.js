const express = require("express");
const router = express.Router();
const passport = require('passport')

router.get('/logout', (req, res, next) => {
    req.session.destroy((err) => {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
});

router.get('/discord', passport.authenticate('discord'));

router.get('/discord/callback', passport.authenticate('discord', {
    successRedirect: "/dashboard",
    failureRedirect: '/'
}));

module.exports = router;
