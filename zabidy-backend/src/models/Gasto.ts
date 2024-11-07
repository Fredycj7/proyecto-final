import { Model, DataTypes } from "sequelize";
import sequelize from "../infrastructure/db-client";

export class Gasto extends Model {
  public GastoID!: number;
  public GiroID!: number;
  public Descripcion!: string;
  public Monto!: number;
  public Fecha!: Date;
}

Gasto.init(
  {
    GastoID: {
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
    Descripcion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Monto: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    Fecha: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "Gastos",
    timestamps: false,
  }
);

export default Gasto;
