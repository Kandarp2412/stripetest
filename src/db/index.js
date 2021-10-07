// const mongoose = require('mongoose')

// const connect =async ()=>{
//     await mongoose.connect('mongodb+srv://Admin:Admin@cluster0.c7mzg.mongodb.net/stripe?retryWrites=true&w=majority',(err,res)=>{
//         if(err){
//             return console.log("database error")
//         }
//         console.log("db connected sucessfully")
//     })
// }

// module.exports = connect

var Sequelize = require("sequelize");

var sequelize = new Sequelize("stripe", "root", "rootroot", {
  host: "localhost",
  dialect: "mysql",
  define: {
    charset: "utf8",
    collate: "utf8_general_ci",
  },
});

let db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.user = require("./user")(sequelize, Sequelize);
db.user_detail = require("./user_detail")(sequelize, Sequelize);

module.exports = { db };
