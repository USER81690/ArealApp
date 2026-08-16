import sequelize from "../sequelize.js"
import {DataTypes} from "sequelize"


const Comments = sequelize.define("Comments",
    {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        articleId: {type: DataTypes.INTEGER, allowNull: false},
        text: {type: DataTypes.TEXT, allowNull: false},
        createdAt: {type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW, field: "created_at"},
        updatedAt: {type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW, field: "updated_at"},
    },
    {
        timestamps: false, // своя логика на createdAt/updatedAt
    },
)


export default Comments