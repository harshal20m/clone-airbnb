const Listing = require("../models/listing");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding.js");
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

//Index
module.exports.index = async (req, res, next) => {
	const allListing = await Listing.find({});
	res.render("listings/index.ejs", { allListing });
};

//New Liting
module.exports.renderNewForm = (req, res) => {
	res.render("listings/new.ejs");
};

//show Listing
module.exports.showListing = async (req, res) => {
	let { id } = req.params;
	const listing = await Listing.findById(id)
		.populate({
			path: "reviews",
			populate: { path: "author" },
		})
		.populate("owner");
	if (!listing) {
		req.flash("error", "Listing you requested for does not exist!");
		res.redirect("/listings");
	}
	console.log(listing);
	res.render("listings/show.ejs", { listing });
};

//Create Listing

module.exports.createListing = async (req, res, next) => {
	let response = await geocodingClient
		.forwardGeocode({
			query: req.body.listing.location,
			limit: 2,
		})
		.send();

	let url = req.file.path;
	let filename = req.file.filename;
	const newListing = new Listing(req.body.listing);
	newListing.owner = req.user._id;
	newListing.image = { url, filename };

	newListing.geometry = response.body.features[0].geometry;

	let savedListing = await newListing.save();
	console.log(savedListing);
	req.flash("success", "New Listing Created!");
	res.redirect("/listings");
};

//Edit Listing
module.exports.renderEditForm = async (req, res, next) => {
	let { id } = req.params;
	const listing = await Listing.findById(id);
	if (!listing) {
		req.flash("error", "Listing you requested for does not exist!");
		res.redirect("/listings");
	}

	let originalImageUrl = listing.image.url;
	originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_250");
	res.render("listings/edit.ejs", { listing, originalImageUrl });
};

//Update Listing
module.exports.updateListing = async (req, res, next) => {
	let { id } = req.params;
	let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });

	if (typeof req.file !== "undefined") {
		let url = req.file.path;
		let filename = req.file.filename;
		listing.image = { url, filename };
		await listing.save();
	}

	req.flash("success", "Listing Updated!");
	res.redirect(`/listings/${id}`);
};

//Delete Listing
module.exports.deleteListing = async (req, res, next) => {
	let { id } = req.params;
	const deletedListing = await Listing.findByIdAndDelete(id);
	console.log(deletedListing);
	req.flash("success", "Listing Deleted!");
	res.redirect("/listings");
};
