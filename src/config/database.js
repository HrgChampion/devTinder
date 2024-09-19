const mongoose = require("mongoose");
const connectDb = async() => {
  await  mongoose.connect("mongodb+srv://hgauba4:T4NGY9GW4XYBHVuB@namastenode.wiit5.mongodb.net/")
}

module.exports = {connectDb}
