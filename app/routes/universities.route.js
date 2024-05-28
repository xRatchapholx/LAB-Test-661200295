module.exports = (app) => {
    var router = require("express").Router();
    const universities = require("../controllers/universities.controller");

    router.get("/" , universities.findAllUniversities);
    router.post("/create-universities", universities.createUniversities);
    router.get("/find-universities/:id" , universities.findUniversitiesById);
    router.put("/update-universities/:id" , universities.updateUniversitiesById);
    router.delete("/delete-universities/:id" , universities.deleteUniversitiesById);

    app.use("/api/universities", router);
};