import { Model, DataTypes } from "sequelize";
import sequelize from "../infrastructure/db-client";
import Presupuesto from "./Presupuesto";
import Gasto from "./Gasto";
import ServicioConstruccion from "./ServicioConstruccion";

export class GiroNegocio extends Model {
  public GiroID!: number;
  public NombreGiro!: string;
  public Descripcion!: string;
}

GiroNegocio.init(
  {
    GiroID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    NombreGiro: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Descripcion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "GirosNegocio",
    timestamps: false,
  }
);

export default GiroNegocio;
