const Listing = require("../models/listing.js");

module.exports.index = (async (req,res)=>{
   const allListings = await Listing.find({});
   res.render("listings/index",{allListings});
})

module.exports.renderNewForm = (async(req,res)=>{
  
     res.render("listings/new.ejs");
})

module.exports.showListing = (async(req,res)=>{
  
   const id = req.params.id.trim();
   const listing = await Listing.findById(id)
   .populate({
            path: "reviews",
            populate: { path: "author" }  
        })
        .populate("owner"); 
   if(!listing){
      req.flash("error", "The listing you trying to access does not exist");
      return res.redirect("/listings");
   }
   console.log(listing);
   res.render("listings/show.ejs", {listing});
});

module.exports.createListing = (async(req, res,next) => {
        let url = req.file.path;
        let filename = req.file.filename;
       
        const newListing = new Listing(req.body.listing);
        newListing.owner = req.user._id;
        newListing.image = {url, filename};
        await newListing.save();
        req.flash("success", "New Listing Created")
        res.redirect("/listings");
    });


module.exports.editListing = (async (req,res) =>{
    const {id} = req.params;
    const listing = await Listing.findById(id);
     req.flash("success", "Listing Updated");
      if(!listing){
      req.flash("error", "The listing you trying to access does not exist");
      return res.redirect("/listings");
   }
   let OriginalImageUrl = listing.image.url;
   OriginalImageUrl = OriginalImageUrl.replace("/upload", "/upload/h_200,w_200");
    res.render("listings/edit.ejs", {listing, OriginalImageUrl});
});

module.exports.updateListing = (async (req, res) => {
    const { id } = req.params;

   
    let listing = await Listing.findByIdAndUpdate(id, {...req.body.listing} );
    if(typeof req.file!=='undefined'){
      let url = req.file.path;
      let filename = req.file.filename;
      listing.image = {url, filename};
      await listing.save();
    }
    
     req.flash("success", "Listing edited");
    res.redirect(`/listing/${id}`);
});

module.exports.deleteListing = (async (req, res) => {
     const {id} = req.params;
     let deletedListing = await Listing.findByIdAndDelete(id);
     req.flash("success", "Listing Deleted");
     res.redirect("/listings");
});