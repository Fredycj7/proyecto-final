import Empleado from "./Empleado";
import Gasto from "./Gasto";
import GiroNegocio from "./GiroNegocio";
import MaquinariaCamion from "./MaquinariaCamion";
import MonitoreoGPS from "./MonitoreoGPS";
import OficinaAdministrativa from "./OficinaAdministrativa";
import Presupuesto from "./Presupuesto";
import Sede from "./Sede";
import ServicioConstruccion from "./ServicioConstruccion";
import Transporte from "./Transporte";

export default function defineRelations() {
  Empleado.belongsTo(Sede, { foreignKey: "SedeID" });
  Sede.hasMany(Empleado, { foreignKey: "SedeID" });

  Gasto.belongsTo(GiroNegocio, { foreignKey: "GiroID" });
  GiroNegocio.hasMany(Gasto, { foreignKey: "GiroID" });

  GiroNegocio.hasMany(Presupuesto, { foreignKey: "GiroID" });
  Presupuesto.belongsTo(GiroNegocio, { foreignKey: "GiroID" });

  GiroNegocio.hasMany(Gasto, { foreignKey: "GiroID" });
  Gasto.belongsTo(GiroNegocio, { foreignKey: "GiroID" });

  GiroNegocio.hasMany(ServicioConstruccion, { foreignKey: "GiroID" });
  ServicioConstruccion.belongsTo(GiroNegocio, { foreignKey: "GiroID" });

  MaquinariaCamion.hasMany(MonitoreoGPS, { foreignKey: "MaquinariaID" });
  MonitoreoGPS.belongsTo(MaquinariaCamion, { foreignKey: "MaquinariaID" });

  MaquinariaCamion.hasMany(Transporte, { foreignKey: "MaquinariaID" });
  Transporte.belongsTo(MaquinariaCamion, { foreignKey: "MaquinariaID" });

  MonitoreoGPS.belongsTo(MaquinariaCamion, { foreignKey: "MaquinariaID" });
  MaquinariaCamion.hasMany(MonitoreoGPS, { foreignKey: "MaquinariaID" });

  OficinaAdministrativa.belongsTo(Sede, { foreignKey: "SedeID" });
  Sede.hasMany(OficinaAdministrativa, { foreignKey: "SedeID" });

  Presupuesto.belongsTo(GiroNegocio, { foreignKey: "GiroID" });
  GiroNegocio.hasMany(Presupuesto, { foreignKey: "GiroID" });

  Sede.hasMany(OficinaAdministrativa, { foreignKey: "SedeID" });
  OficinaAdministrativa.belongsTo(Sede, { foreignKey: "SedeID" });

  Sede.hasMany(Empleado, { foreignKey: "SedeID" });
  Empleado.belongsTo(Sede, { foreignKey: "SedeID" });

  ServicioConstruccion.belongsTo(GiroNegocio, { foreignKey: "GiroID" });
  GiroNegocio.hasMany(ServicioConstruccion, { foreignKey: "GiroID" });

  Transporte.belongsTo(MaquinariaCamion, { foreignKey: "MaquinariaID" });
  MaquinariaCamion.hasMany(Transporte, { foreignKey: "MaquinariaID" });
}
