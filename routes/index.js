var express = require('express');
var router = express.Router();

var isAuthenticated = function (req, res, next) {
    // if user is authenticated in the session, call the next() to call the next request handler
    // Passport adds this method to request object. A middleware is allowed to add properties to
    // request and response objects
    if (req.isAuthenticated())
        return next();
    // if the user is not authenticated then redirect him to the login page
    res.redirect('/');
};

module.exports = function(passport){

    /* GET login page. */
    router.get('/',   function(req, res) {
        // Display the Login page with any flash message, if any
        if (isAuthenticated){
            res.render('index', { message: req.flash('message'),user: req.user });
        }else{
            res.render('index', { message: req.flash('message') });
        }

    });
    router.get('/login', function(req, res) {
        // Display the Login page with any flash message, if any
        res.render('login', { message: req.flash('message') });
    });
    /* Handle Login POST */
    router.post('/login', passport.authenticate('login', {
        successRedirect: '/home',
        failureRedirect: '/login',
        failureFlash : true
    }));

    /* GET Registration Page */
    router.get('/signup', function(req, res){
        res.render('register',{message: req.flash('message')});
    });

    /* Handle Registration POST */
    router.post('/signup', passport.authenticate('signup', {
        successRedirect: '/home',
        failureRedirect: '/signup',
        failureFlash : true
    }));

    /* GET Home Page */
    router.get('/home', isAuthenticated, function(req, res){
        res.render('home', { user: req.user });
    });


    /* Handle Logout */
    router.get('/signout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    /* О программе */
    router.get('/about',  function(req, res) {
        if (isAuthenticated){
            res.render('about', { message: req.flash('message'),user: req.user });
        }else{
            res.render('about', { message: req.flash('message') });
        }
    });
    /* О программе */
    router.get('/content1', function(req, res) {
        if (isAuthenticated){
            res.render('content1', { message: req.flash('message'),user: req.user });
        }else{
            res.render('content1', { message: req.flash('message') });
        }
    });

    /* О программе */
    router.get('/content2', function(req, res) {
        if (isAuthenticated){
            res.render('content2', { message: req.flash('message'),user: req.user });
        }else{
            res.render('content2', { message: req.flash('message') });
        }
    });

    return router;
};

