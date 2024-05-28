const db = require("../models");
const Universities = db.universities;
const Student = db.student;
const Stdall = db.stdall;

exports.findAllUniversities = (req, res) => {
    try {
        Universities.findAll({
            attributes: ['name'],
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

exports.createUniversities = (req, res) => {
    try {
        if (!req.body.name) {
            res.status(400).json({
                message: "Id or Name cannot be empty!"
            });
            return;
        }
        const universitiesAttribute = {
            id: req.body.id,
            name : req.body.name
        };

        Universities.create(universitiesAttribute)
            .then((data) => {
                res.status(200).json({ message: "Universities created." });
            })
            .catch((err) => {
                res.status(500).json({ message: err.message });
            });
    } catch (error) {
        console.log(error);
    }
};

exports.findUniversitiesById = (req, res) => {
    try {
        const id = req.params.id;
        Universities.findByPk(id, {attributes: ['id','name'],})
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

exports.updateUniversitiesById = (req, res) => {
    try {
        const id = req.params.id;

        const updateUniversities = {
            name: req.body.name,
            Bachelors : req.body.name,
            Master: req.body.Master,
        };

        Universities.update(updateUniversities, { where: { id: id } })
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

exports.deleteUniversitiesById = (req, res) => {
    try {
        const id = req.params.id;
        Universities.destroy({ where: { id:id } })
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
