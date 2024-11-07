import { Model, DataTypes } from "sequelize";
import sequelize from "../infrastructure/db-client";
import Transporte from "./Transporte";
import MonitoreoGPS from "./MonitoreoGPS";

export class MaquinariaCamion extends Model {
  public MaquinariaID!: number;
  public Tipo!: string;
  public Marca!: string;
  public Modelo!: string;
  public Año!: number;
  public GPSID!: number;
}

MaquinariaCamion.init(
  {
    MaquinariaID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    Tipo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Marca: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Modelo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Año: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    GPSID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "MaquinariaCamiones",
    timestamps: false,
  }
);

export default MaquinariaCamion;
