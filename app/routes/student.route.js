module.exports = (app) => {
var router = require("express").Router();
const student = require("../controllers/student.controller");

router.get("/", student.findAllStudent);

router.post("/create-student", student.insertStudent);

router.get("/find-student/:id", student.findStudentById);

router.put("/update-student/:id", student.updateStudentById);

router.delete("/delete-student/:id", student.deleteStudentById);

router.post("/create-stdall", student.addStudentToUniversities);

app.use("/api/student", router);
};