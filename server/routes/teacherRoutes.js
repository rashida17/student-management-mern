const express= require ("express");
const router= express.Router();

const {createTeacher, getTeacher, getTeacherById, updateTeacher, deleteTeacher} = require("../controllers/teacherController");


router.post("/",createTeacher);
router.get("/",getTeacher);
router.get("/:id",getTeacherById);
router.put("/:id",updateTeacher);
router.delete("/:id",deleteTeacher);


module.exports= router;

