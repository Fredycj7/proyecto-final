import { Model, DataTypes } from "sequelize";
import sequelize from "../infrastructure/db-client";
import MaquinariaCamion from "./MaquinariaCamion";

export class MonitoreoGPS extends Model {
  public MonitoreoID!: number;
  public MaquinariaID!: number;
  public FechaHora!: Date;
  public Latitud!: number;
  public Longitud!: number;
  public Velocidad!: number;
  public TiempoUso!: number;
}

MonitoreoGPS.init(
  {
    MonitoreoID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    MaquinariaID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "MaquinariaCamiones",
        key: "MaquinariaID",
      },
    },
    FechaHora: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    Latitud: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    Longitud: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    Velocidad: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    TiempoUso: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "MonitoreoGPS",
    timestamps: false,
  }
);

export default MonitoreoGPS;
