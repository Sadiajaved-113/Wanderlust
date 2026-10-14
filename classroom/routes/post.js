const express = require("express");
const router = express.Router();


//Index post-Route
router.get("/", (req,res)=>{
    res.send("Get for posts");
});

//Show post-Route
router.get("/:id", (req,res)=>{
    res.send("Get for show posts");
});

//Create Post-Route
router.post("/", (req,res)=>{
    res.send("Post for posts");
});

//Delete post-Route
router.delete("/:id", (req,res)=>{
    res.send("Delete for posts");
});

module.exports = router;