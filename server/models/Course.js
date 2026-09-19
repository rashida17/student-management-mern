const mongoose=require("mongoose");
const courseSchema = mongoose.Schema(
{

 name:{
    type:String,
    required:true
 },
  code:{
    type:String,
    rquired:true
},
  instructor:{
    type:String,
    required:true
  }


});


const Course= mongoose.model("Course",courseSchema);
module.exports=Course;