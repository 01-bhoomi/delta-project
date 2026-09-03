const  express = require("express");
const router = express.Router();
const  User = require("../models/user.js");//AddnewUser
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userController = require("../controllers/users.js");


// for router :route for same route 

// signUp & //signup/user

router.route("/signup")
.get(userController.renderSignupForm) //signUp

.post(wrapAsync(userController.signup)); //signup/user

 // loginUser

router.route("/login")
.get(userController.renderLoginForm )

.post(saveRedirectUrl, passport.authenticate("local", {failureRedirect: '/login', failureFlash: true}), userController.login);

 // logoutUser
router.get("/logout", userController.logout);

// router
module.exports = router;


