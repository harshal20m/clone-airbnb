const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

const userController = require("../controllers/users.js");

//User Singup
router.route("/signup").get(userController.renderSignupForm).post(wrapAsync(userController.signup));

//User Login
router
	.route("/login")
	.get(userController.renderLoginForm)
	.post(
		saveRedirectUrl,
		passport.authenticate("local", {
			failureRedirect: "/login",
			failureFlash: true,
		}),
		userController.login
	);

//User logout

router.get("/logout", userController.logout);

router.get("/", (req, res) => {
	//redirect home page---------
	res.redirect("/listings");
});

module.exports = router;
