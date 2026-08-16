import sequelize from "../sequelize.js"
import {DataTypes} from "sequelize"


const Articles = sequelize.define("Articles",
    {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        title: {type: DataTypes.STRING, allowNull: false},
        content: {type: DataTypes.TEXT, allowNull: false},
        createdAt: {type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW, field: "created_at"},
        updatedAt: {type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW, field: "updated_at"},
    },
    {
        timestamps: false, // своя логика на createdAt/updatedAt
    },
)


export default Articles