const db = require("../models");
const Student = db.student;
const University = db.universities;
const Stdall = db.stdall;

exports.findAllStudent = (req, res) => {
    try {
        Student.findAll({
            include: [
                {
                    model: University,
                    attributes: ["name"]
                }
            ]
        })
            .then(data => {
                res.status(200).json(data);
            })
            .catch(err => {
                res.status(500).json({ message: err.message });
            });
    } catch (error) {
        console.log(error);
    }
};

exports.insertStudent = (req, res) => {
    try {
        if (!req.body.name) {
            res.status(400).json({
                message: "Content cannot be empty!"
            });
            return;
        }
        const newStudent = {
            name : req.body.name,
        };

        Student.create(newStudent)
            .then(data => {
                res.status(200).json({ message: "created!" });
            })
            .catch(err => {
                res.status(500).json({ message: err.message });
            });

    } catch (error) {
        console.log(error);
    }
};

exports.findStudentById = (req, res) => {
    try {
        const id = req.params.id;
        Student.findByPk(id, {
            include: [
                {
                    model: University,
                    attributes: ["name"]
                }
            ]
        })
            .then(data => {
                if (data) {
                    res.status(200).json(data);
                } else {
                    res.status(404).json({
                        message: "Id not found!"
                    });
                }
            })
            .catch(err => {
                res.status(500).json({ message: err.message })
            });
    } catch (error) {
        console.log(error);
    }
};

exports.updateStudentById = (req, res) => {
    try {
        const id = req.params.id;

        const updateStudent = {
            name: req.body.name,
            Bachelors : req.body.name,
            Master: req.body.Master,
        };

        Student.update(updateStudent, { where: { id: id } })
            .then(data => {
                if (data == 1) {
                    res.status(200).json({
                        message: "Updated successfully"
                    });
                } else {
                    res.status(400).json({
                        message: "Update failed!"
                    });
                }
            })
            .catch(err => {
                res.status(500).json({ message: err.message })
            });
    } catch (error) {
        console.log(error);
    }
};

exports.deleteStudentById = (req, res) => {
    try {
        const id = req.params.id;
        Student.destroy({ where: { id:id } })
        .then( data => {
            if(data == 1){
                res.status(200).json({
                    message: "Deleted successfully"
                });
            }else{
                res.status(400).json({
                    message: "Deleted failed!"
                });
            }
        })
        .catch( err => {
            res.status(500).json({ message: err.message });
        });
    } catch (error) {
        console.log(error);
    }
};

exports.addStudentToUniversities = (req, res) => {
    try {
        if (!req.body.studentId || !req.body.Bachelors) {
            res.status(400).json({
                message: "Student ID or Universities ID cannot be empty!"
            });
            return ;
        }

        University.findByPk(req.body.Bachelors)
            .then((universities) => {
                if (!universities) {
                    res.status(404).json({ message: "Universities not found!" })
                    return null;
                }

                Student.findByPk(req.body.studentId)
                    .then((student) => {
                        if (!student) {
                            res.status(404).json({ message: "Student not found!" })
                            return null;
                        }
                        
                        University.findByPk(req.body.Master)
                        .then((masters) => {
                            if (!student) {
                                res.status(404).json({ message: "Student not found!" })
                                return null;
                            }
                            
                            const junctionAttribute = {
                                studentId: student.id,
                                universitiesId: universities.id,
                                studentName: student.name,
                                Bachelors: universities.name,
                                Master: masters.name
                            };
                            console.log(junctionAttribute); 
                            Stdall.create(junctionAttribute)
                            .then( res.status(200).json({message: "Universities created."}))
                            .catch((err) => {
                                res.status(500).json({ message: err.message });
                            });
                    })
                })
            })
            .catch((err) => res.status(500).json({ message: err.message }));

    } catch (error) {
        console.log(error);
    }
};