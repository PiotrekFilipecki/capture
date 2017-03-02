
module.exports = (app, passport) => {
    app.get('/', function (req, res, next) {
        res.render('index', {title: 'Index || Capture'});

        
    });

    app.get('/signup', (req, res) => {
    	var errors = req.flash('error');
    	console.log(errors);
    	res.render('user/signup', {title: 'Signup || Capture', messages: errors, hasErrors: errors.length > 0});
    });

    app.post('/signup', validate, passport.authenticate('local.signup', {
    	successRedirect: '/home',
    	failureRedirect: '/signup',
    	failureFlash: true
    }));

    app.get('/login', (req, res) => {
    	var errors = req.flash('error');
    	res.render('user/login', {title: 'Login || Capture', messages: errors, hasErrors: errors.length > 0});
    });

    app.post('/login', loginValidation, passport.authenticate('local.login', {
    	successRedirect: '/home',
    	failureRedirect: '/login',
    	failureFlash: true
    }));

    app.get('/home', (req, res) => {
        res.render('home', {title: 'Home || Capture'});
    });

    app.get('/logout', (req, res) => {
		req.logout();
		req.session.destroy((err) => {
	        res.redirect('/');
	    });
	})
} 

function validate(req, res, next){
	req.checkBody('fullname', 'Fullname is required').notEmpty();
	req.checkBody('fullname', 'Fullname not less than 5').isLength({min:5});
	req.checkBody('email', 'required').notEmpty();
	req.checkBody('email', 'email is invalid').isEmail();
	req.checkBody('password', 'required').notEmpty();
	req.checkBody('password', 'password not less than 5').isLength({min:5});
	req.check("password", "Password Must Contain at least 1 Number.").matches(/^(?=.*\d)(?=.*[a-z])[0-9a-z]{5,}$/, "i");

	var errors = req.validationErrors();

	if(errors){
		var messages = [];
		errors.forEach((error) => {
			messages.push(error.msg);
		});

		req.flash('error', messages);
		res.redirect('/signup');
	} else{
		return next();
	}
}

function loginValidation(req, res, next){
	/*req.checkBody('fullname', 'Fullname is required').notEmpty();
	req.checkBody('fullname', 'Fullname not less than 5').isLength({min:5});*/
	req.checkBody('email', 'required').notEmpty();
	req.checkBody('email', 'email is invalid').isEmail();
	req.checkBody('password', 'required').notEmpty();
	req.checkBody('password', 'password not less than 5').isLength({min:5});
	req.check("password", "Password Must Contain at least 1 Number.").matches(/^(?=.*\d)(?=.*[a-z])[0-9a-z]{5,}$/, "i");

	var loginErrors = req.validationErrors();

	if(loginErrors){
		var messages = [];
		loginErrors.forEach((error) => {
			messages.push(error.msg);
		});

		req.flash('error', messages);
		res.redirect('/login');
	} else{
		return next();
	}
}

