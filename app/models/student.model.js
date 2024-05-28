module.exports = (sequelize, dataType) => {
    const Student = sequelize.define("student", {
      id: {
        type: dataType.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: dataType.STRING,
        allowNull: false,
      },      
    });
  
    return Student;
  };