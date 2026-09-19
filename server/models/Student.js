const mongoose = require("mongoose");
const studentSchema = new mongoose.Schema({
name :{
        type: String,
        required: true

},

email :{
    type: String,
    required: true
},

  rollNumber :{
    type: String,
    required: true
  },

  department : {
    type: String,
    required: true
  },

  semester: {
    type: Number,
    required: true
  },
    
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course"

  },

});
 const Student= mongoose.model("Student",studentSchema);
 module.exports = Student;