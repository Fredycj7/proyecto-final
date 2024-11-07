import { Model, DataTypes } from "sequelize";
import sequelize from "../infrastructure/db-client";
import GiroNegocio from "./GiroNegocio";

export class Presupuesto extends Model {
  public PresupuestoID!: number;
  public GiroID!: number;
  public Monto!: number;
  public FechaInicio!: Date;
  public FechaFin!: Date;
}

Presupuesto.init(
  {
    PresupuestoID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    GiroID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "GirosNegocio",
        key: "GiroID",
      },
    },
    Monto: {
      type: DataTypes.FLOAT,
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
  },
  {
    sequelize,
    tableName: "Presupuestos",
    timestamps: false,
  }
);

export default Presupuesto;
