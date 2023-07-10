import { Router } from "express";
import Courses from '../dao/dbManager/courses.js';


const router = Router();
const courseManager = new Courses();

router.get('/', async (req, res) => {
    let courses = await courseManager.getAll();
    res.send({ status: "success", payload: courses })
})

router.post('/', async (req, res) => {
    const { title, description } = req.body;
    let newCourse = {
        title,
        description,
        teacher: "sin Asignar",
        students: []
    }
    const result = await courseManager.saveCourses(newCourse)
    res.send({ status: "succes", payload: result });
})

export default router;