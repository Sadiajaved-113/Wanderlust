const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing");
const flash = require("connect-flash");
const {isLoggedIn, isOwner, validateListing} = require("../middleware.js");
const listingController = require("../controllers/listing.js");
const {storage} = require("../cloudConfig.js");
const multer  = require('multer')
const upload = multer({ storage });

router
.route("/")
.get( wrapAsync(listingController.index))
.post( isLoggedIn,upload.single('listing[image]'), wrapAsync(listingController.createListing));


//New Route
router.get("/new", isLoggedIn, wrapAsync(listingController.renderNewForm));

router
.route("/:id")
.get( wrapAsync(listingController.showListing))
.put(isLoggedIn, upload.single('listing[image]'), isOwner, wrapAsync(listingController.updateListing))
.delete(isLoggedIn, isOwner, wrapAsync(listingController.deleteListing));
 
//Edit Route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.editListing));

module.exports = router;
