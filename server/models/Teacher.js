const mongoose= require("mongoose");
const teacherSchema = new mongoose.Schema(
    {

name :{
    type : String,
    required : true
},
 
department :{
    type : String,
    required : true,
    unique: true
},

email :{
    type : String,
    required : true
},

designation :{
    type : String,
},

phone : {
    type : String
},

isActive : {
    type: Boolean,
    default: true
}


    }
);

// This is MODEL of Teacher
 const Teacher= mongoose.model("Teacher",teacherSchema);
  // This is use for export Model
  module.exports = Teacher;