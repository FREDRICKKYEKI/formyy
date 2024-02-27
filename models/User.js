import { DataTypes, Model } from "sequelize";
import db from "../db_engine/db.js";
import Form from "./Form.js";

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4(),
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date(),
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date(),
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM,
      values: ["regular", "admin"],
      allowNull: true,
    },
    phonenumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize: db,
    modelName: "User",
    tableName: "users", // Ensure that the model maps to the correct table name
    timestamps: true, // Set to true if you want Sequelize to automatically manage createdAt and updatedAt fields
    underscored: true, // Set to true if your database column names use snake_case
  }
);

export default User;

// relationship between User and Form
User.hasMany(Form, {
  foreignKey: "author_id",
  onDelete: "CASCADE", // Cascade deletion
  onUpdate: "CASCADE", // Cascade update
});
