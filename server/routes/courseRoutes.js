const express = require("express");
const router= express.Router();

const { createCourse,getCourse,getCourseById,updateCourse,deleteCourse} = require("../controllers/courseController");
 

router.post("/",createCourse);
router.put("/:id",updateCourse);
router.delete("/:id",deleteCourse);
router.get("/",getCourse);
router.get("/:id",getCourseById);
module.exports = router;