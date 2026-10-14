const Listing = require("./models/listing.js");
const Review = require("./models/reviews.js");
const ExpressError = require("./utils/ExpressError.js");
const {ListingSchema} = require("./Schema.js");
const {ReviewSchema} = require("./Schema.js");
module.exports.isLoggedIn = (req,res,next)=>{
     
      if(!req.isAuthenticated()){
            req.session.redirectUrl = req.originalUrl;
            req.flash("error", "You must be logged in to create listing");
            return res.redirect("/login");
        }
        next();
}

module.exports.saveRedirectUrl = (req,res,next)=>{
      if(req.session.redirectUrl){
            res.locals.redirectUrl = req.session.redirectUrl;
            
      }
      next();
}

module.exports.isOwner = async(req,res,next)=>{
       const { id } = req.params;
       const listing = await Listing.findById(id);
       if(!listing.owner._id.equals(res.locals.currUser._id)){
        req.flash("error", "You dont have Permission to edit");
        return res.redirect(`/listing/${id}`);
    }
    next();
}

module.exports.validateListing = (req, res, next) => {
    const { error } = ListingSchema.validate(req.body);  // Joi validation
    if (error) {
        const msg = error.details.map(el => el.message).join(','); // collect all errors
        throw new ExpressError(400, msg); 
    } else {
        next(); // pass control to next middleware/route handler
    }
};

module.exports.validateReview = (req, res, next) => {
    const { error } = ReviewSchema.validate(req.body);  // Joi validation
    if (error) {
        const msg = error.details.map(el => el.message).join(','); // collect all errors
        throw new ExpressError(400, msg); 
    } else {
        next(); // pass control to next middleware/route handler
    }
};

module.exports.isReviewAuthor = async(req,res,next)=>{
       const { id, reviewId } = req.params;
       let review = await Review.findById(reviewId);
       if(!review.author._id.equals(res.locals.currUser._id)){
        req.flash("error", "You are not the author of this review");
        return res.redirect(`/listing/${id}`);
    }
    next();
}