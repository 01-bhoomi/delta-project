const Listing = require("./models/listing");
const Review = require("./models/review");
const ExpressError = require("./utils/ExpressError.js");
const {listingSchema, reviewSchema} = require("./schema.js");   //schema.js

module.exports.isLoggedIn = (req, res, next) =>{
    if(!req.isAuthenticated()){    // using passport we'll check if user are login or not
        req.session.redirectUrl = req.orignalUrl; //redirectUrl save
        req.flash("error", "You must be logged in to create listings");
        return res.redirect("/login");
    } 
    next();
};

// redirectUrl save
module.exports.saveRedirectUrl = (req, res, next) =>{
    if(req.session.redirectUrl)  {
        res.locals.redirectUrl = req.session.redirectUrl; //redirecturl save in locals
    }
    next();
};

// not given permssion for edit
module.exports.isOwner = async(req, res, next) =>{
  let { id } = req.params;
  let listing = await Listing.findById(id);
  if(!listing.owner.equals(res.locals.currUser._id)){
    req.flash("error", "You are not the owner of this listing");
    return res.redirect(`/listings/${id}`);
  }
  next();
};

// validate listing joi-> Validation for Schema(MIDDLEWARE)

module.exports.validateListing = (req, res, next) =>{
    let {error} = listingSchema.validate(req.body);
  
    if(error){
      let errMsg = error.details.map((el) => el.message).join(",");
      throw new ExpressError(404, errMsg);
    }else{
      next();
    }
  };

  // Review validate
  module.exports.validateReview = (req, res, next) =>{
    let {error} = reviewSchema.validate(req.body);
  
    if(error){
      let errMsg = error.details.map((el) => el.message).join(",");
      throw new ExpressError(404, errMsg);
    }else{
      next();
    }
  };

  // for not giving permission to delete by any other author
  module.exports.isReviewAuthor = async(req, res, next) =>{
    let { id, reviewId } = req.params;
    let review = await Review.findById(reviewId);
    if(!review.author.equals(res.locals.currUser._id)){
      req.flash("error", "You are not the author of this review!");
      return res.redirect(`/listings/${id}`);
    }
    next();
  };
  