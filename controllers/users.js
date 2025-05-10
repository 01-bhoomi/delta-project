const User = require("../models/user");


// route get signUp
module.exports.renderSignupForm = (req, res) =>{
    res.render("users/signup.ejs");
};

 //signup/user
module.exports.signup = async(req, res) =>{
    try{
        let {username, email, password} = req.body;
        const newUser = new User ({email, username}); //Addnewuser
        const registeredUser = await User.register(newUser, password);//newUserRigisterinDb
        console.log(registeredUser);
        req.login(registeredUser, (err) =>{
            if(err){
                return next (err);
            }
            req.flash("success", "Welcome to wanderlust!");
            res.redirect("/listings");
        })
    } catch(e){
       req.flash("error", e.message);
        res.redirect("/signup");
    }
};

 // get -loginUserform
module.exports.renderLoginForm = (req, res) =>{
    res.render("users/login.ejs");
};

// post - loginuser
module.exports.login = async(req, res) =>{
    req.flash("success", "Welcome back to WanderLust!");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
};

// logOut
module.exports.logout = (req, res, next) =>{
    req.logout((err) =>{
        if(err){
            return next(err);
        }
        req.flash("success", "You are logged out now!");
        res.redirect("/listings");
    });
};
