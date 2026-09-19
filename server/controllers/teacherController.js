

const Teacher = require("../models/Teacher");

// Create Teacher 
 const createTeacher = async(req,res) => {

try{

    const teacher = await Teacher.create(req.body)
    res.status(201).json(teacher);

}

catch(error)
{

  res.status(500).json({ message: error.message});

}

 };


const getTeacher =  async(req,res) => {

    try{
           const teacher= await Teacher.find();
           res.status(201).json({teacher});
    }
    catch(error)
    {
        res.status(500).json({

            message :  error.message
        });
    }
}



const getTeacherById = async (req,res)=> {
try{

    const teacher= await Teacher.findById(req.params.id);
    if(!teacher){ return res.status(404).json({ message: "Teacher not found"});}
    res.json({teacher});
}
 
catch(error)
{  
        res.status(500).json({

            message :  error.message
        });         }
};



const updateTeacher =  async (req,res) => {

try{

    const teacher= await Teacher.findByIdAndUpdate(req.params.id,req.body, { new: true })
    if(!teacher)
    { return res.status(404).json({ message : "Teacher Not found"});}
    res.json({teacher});
}
catch(error){   res.status(500).json({

            message :  error.message
        });   }
};


const deleteTeacher= async (req,res) =>{
  try{

    const teacher= await Teacher.findByIdAndDelete(req.params.id);
    if(!teacher){ return res.status(404).json({ message: "Teacher not found"});} 
    res.json({
  message: "Teacher deleted successfully"
});
  }
  catch(error){
    res.status(500).json({ message: error.message})
  }

};
module.exports = { createTeacher, getTeacher,getTeacherById,updateTeacher,deleteTeacher};