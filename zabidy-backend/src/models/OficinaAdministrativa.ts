import { Model, DataTypes } from "sequelize";
import sequelize from "../infrastructure/db-client";
import Sede from "./Sede";

export class OficinaAdministrativa extends Model {
  public OficinaID!: number;
  public Ubicacion!: string;
  public Alquilada!: boolean;
  public SedeID!: number;
}

OficinaAdministrativa.init(
  {
    OficinaID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    Ubicacion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Alquilada: {
      type: DataTypes.BOOLEAN,
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
    tableName: "OficinasAdministrativas",
    timestamps: false,
  }
);

export default OficinaAdministrativa;
