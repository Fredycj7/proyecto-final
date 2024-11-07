import { Model, DataTypes } from "sequelize";
import sequelize from "../infrastructure/db-client";
import OficinaAdministrativa from "./OficinaAdministrativa";
import Empleado from "./Empleado";

export class Sede extends Model {
  public SedeID!: number;
  public NombreSede!: string;
  public Ubicacion!: string;
}

Sede.init(
  {
    SedeID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    NombreSede: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Ubicacion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "Sedes",
    timestamps: false,
  }
);

export default Sede;
