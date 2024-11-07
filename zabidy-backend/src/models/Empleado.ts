import { Model, DataTypes } from "sequelize";
import sequelize from "../infrastructure/db-client";
import Sede from "./Sede";

export class Empleado extends Model {
  public EmpleadoID!: number;
  public Nombre!: string;
  public Cargo!: string;
  public SedeID!: number;
}

Empleado.init(
  {
    EmpleadoID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    Nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Cargo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    SedeID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Sedes",
        key: "SedeID",
      },
    },
  },
  {
    sequelize,
    tableName: "Empleados",
    timestamps: false,
  }
);

export default Empleado;
