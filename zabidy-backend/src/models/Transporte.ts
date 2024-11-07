import { Model, DataTypes } from "sequelize";
import sequelize from "../infrastructure/db-client";
import MaquinariaCamion from "./MaquinariaCamion";

export class Transporte extends Model {
  public TransporteID!: number;
  public Empresa!: string;
  public Origen!: string;
  public Destino!: string;
  public Fecha!: Date;
  public MaquinariaID!: number;
}

Transporte.init(
  {
    TransporteID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    Empresa: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Origen: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Destino: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Fecha: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    MaquinariaID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "MaquinariaCamiones",
        key: "MaquinariaID",
      },
    },
  },
  {
    sequelize,
    tableName: "Transportes",
    timestamps: false,
  }
);

export default Transporte;
