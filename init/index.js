const mongoose = require('mongoose');
const initData = require('./data');
const Listing = require('../models/listing');

const Mongo_URL = 'mongodb://127.0.0.1:27017/wanderlust';

main()
.then(()=>{
    console.log("connected to DB");
})
.catch((err)=>{
    console.log(err);
})
async function main() {
    await mongoose.connect(Mongo_URL);
}

const initDB = async() =>{
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({ ...obj, owner:"68af8b6e350a5a6218ac0c29" }));
    console.log("Deleted all listings");

    await Listing.insertMany(initData.data);
    console.log("Inserted initial data");
}

initDB();
