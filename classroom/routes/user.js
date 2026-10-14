const express = require("express");
const router = express.Router();

//Index User-Route
router.get("/", (req,res)=>{
    res.send("Get for Users");
});

//Show User-Route
router.get("/:id", (req,res)=>{
    res.send("Get for show users");
});

//Create User-Route
router.post("/", (req,res)=>{
    res.send("Post for users");
});

//Delete User-Route
router.delete("/:id", (req,res)=>{
    res.send("Delete for users");
});

module.exports = router;