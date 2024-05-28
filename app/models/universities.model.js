module.exports = (sequelize, dataType) => {
    const Universities = sequelize.define("universities", {
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
  
    return Universities;
  };