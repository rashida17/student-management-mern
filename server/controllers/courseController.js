const Course= require("../models/Course");

const createCourse = async(req,res) => {
 try{
       const course= await Course.create(req.body); 
       res.status(201).json(course);


 }
 catch(error)
 { res.status(500).json({
    Message: 'Course is not created'
 });
 }
};


const getCourse = async (req,res) => {
try{
      const course = await Course.find();
     
       res.json(course);
}
catch(error)
{
    res.status(500).json({ message: 'Internal server error' });

}
};


const getCourseById = async(req,res) =>{
    try{
            const course= await Course.findById(req.params.id);
              if(!course)
    {  return res.status(404).json({ message:`no course exist of this ID ${req.params.id}` }) }
            res.json(course);

    }
    catch(error){ res.status(500).json({ message : 'Intenal Server error'})}
};


const updateCourse = async(req,res) => {
try{
       const course= await Course.findByIdAndUpdate(req.params.id, req.body, {new:true});
       if (!course) {
    return res.status(404).json({
        message: "Course not found"
    });
}
       res.json(course);

}
catch(error)
{   res.status(500).json({
      message: 'Internal Server error/Course did not updated'
});      }
}; 

const deleteCourse = async(req,res) =>{

    try{ 
        const course= await Course.findByIdAndDelete(req.params.id);
        if (!course) {
    return res.status(404).json({
        message: "Course not found"
    });
}
        res.json(course);
    }
    catch(error){
        res.json({ message : 'Course did not deleted sucessfully'});
    }
};

module.exports= {createCourse,getCourse,getCourseById,updateCourse,deleteCourse};