const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const Review = require("../models/reviews");
const Listing = require("../models/listing");
const {validateReview, isLoggedIn, isReviewAuthor} = require("../middleware.js");
const reviewController = require("../controllers/reviews");

//Reviews Route
router.post("/", isLoggedIn,  wrapAsync(reviewController.createReview));

//Delete Reviews
router.delete("/:reviewId", isLoggedIn, isReviewAuthor,   wrapAsync(reviewController.destroyReview));

module.exports = router;