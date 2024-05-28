module.exports = (sequelize, dataType) => {
    const db = require(".");
    const Student = db.student;
    const Universities = db.universities;

    const Stdall = sequelize.define("Stdall", {
      studentId: {
        type: dataType.INTEGER,
        references: Student,
        referencesKey: 'id'
    },
      studentName: {
      type: dataType.STRING,
      references: Student,
      referencesKey: 'name'
    },
      Bachelors: {
        type: dataType.STRING,
        references: Universities,
        referencesKey: 'name'
    },
      Master: {
        type: dataType.STRING,
        references: Universities,
        referencesKey: 'name'
    }

    });
  
    return Stdall;
  };