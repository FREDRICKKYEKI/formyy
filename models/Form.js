import { DataTypes } from "sequelize";
import db from "../db_engine/db.js";
import Submission from "./Submission.js";

const Form = db.define(
  "Form",
  {
    id: {
      type: DataTypes.STRING(60),
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4(),
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      onUpdate: DataTypes.NOW,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    author_id: {
      type: DataTypes.STRING(60),
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
    form_schema: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    decay_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    form_state: {
      type: DataTypes.ENUM("active", "inactive"),
      allowNull: false,
      defaultValue: "active",
    },
  },
  {
    sequelize: db,
    modelName: "Form",
    tableName: "forms", // Ensure that the model maps to the correct table name
    timestamps: true, // Set to true if you want Sequelize to automatically manage createdAt and updatedAt fields
    underscored: true, // Set to true if your database column names use snake_case
  }
);

export default Form;

// Define the relationship between the Form and Submission models
Form.hasMany(Submission, {
  foreignKey: "form_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
