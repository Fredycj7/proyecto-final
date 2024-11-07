import { Model, DataTypes } from "sequelize";
import sequelize from "../infrastructure/db-client";
import GiroNegocio from "./GiroNegocio";

export class ServicioConstruccion extends Model {
  public ServicioID!: number;
  public Descripcion!: string;
  public Ubicacion!: string;
  public FechaInicio!: Date;
  public FechaFin!: Date;
  public GiroID!: number;
}

ServicioConstruccion.init(
  {
    ServicioID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    Descripcion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Ubicacion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    FechaInicio: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    FechaFin: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    GiroID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "GirosNegocio",
        key: "GiroID",
      },
    },
  },
  {
    sequelize,
    tableName: "ServiciosConstruccion",
    timestamps: false,
  }
);

export default ServicioConstruccion;
