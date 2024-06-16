const Listing = require("./models/listing");
const Review = require("./models/review");
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema, reviewSchema } = require("./schema.js");

//Login Authentication
module.exports.isLoggedIn = (req, res, next) => {
	if (!req.isAuthenticated()) {
		req.session.redirectUrl = req.originalUrl;
		req.flash("error", "Please login to continue!");
		return res.redirect("/login");
	}
	next();
};

module.exports.saveRedirectUrl = (req, res, next) => {
	if (req.session.redirectUrl) {
		res.locals.redirectUrl = req.session.redirectUrl;
	}
	next();
};

//check the Real Owner
module.exports.isOwner = async (req, res, next) => {
	let { id } = req.params;
	let listings = await Listing.findById(id);
	if (!listings.owner._id.equals(res.locals.currUser._id)) {
		req.flash("error", "You are not the owner of this listing!");
		return res.redirect(`/listings/${id}`);
	}
	next();
};

//validateListing
module.exports.validateListing = (req, res, next) => {
	const { error } = listingSchema.validate(req.body);

	if (error) {
		let errMsg = error.details.map((el) => el.message).join(",");
		throw new ExpressError(400, errMsg);
	} else {
		next();
	}
};

//Validate reviews
module.exports.validateReview = (req, res, next) => {
	const { error } = reviewSchema.validate(req.body);

	if (error) {
		let errMsg = error.details.map((el) => el.message).join(",");
		throw new ExpressError(400, errMsg);
	} else {
		next();
	}
};

//check the real Author of review
module.exports.isReviewAuthor = async (req, res, next) => {
	let { id, reviewId } = req.params;
	let review = await Review.findById(reviewId);
	if (!review.author.equals(res.locals.currUser._id)) {
		req.flash("error", "You are not the author of this review!");
		return res.redirect(`/listings/${id}`);
	}
	next();
};
