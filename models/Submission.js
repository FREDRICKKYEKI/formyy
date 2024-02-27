import { DataTypes, Model } from "sequelize";
import db from "../db_engine/db.js";

class Submission extends Model {}

Submission.init(
  {
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4(),
    },
    form_id: {
      type: DataTypes.STRING(60),
      allowNull: false,
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
    user_id: {
      type: DataTypes.STRING(60),
      allowNull: false,
      unique: true,
    },
    submission_data: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: "Submission",
    tableName: "submissions",
    timestamps: true, // Set to true if you want Sequelize to automatically manage createdAt and updatedAt fields
    underscored: true, // Set to true if your database column names use snake_case
  }
);

export default Submission;
