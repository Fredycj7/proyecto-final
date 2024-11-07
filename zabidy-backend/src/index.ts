import express, { Request, Response } from "express";
import sequelize from "./infrastructure/db-client";
import EmpleadoController from "./controller/EmpleadoController";
import GastoController from "./controller/GastoController";
import GiroNegocioController from "./controller/GiroNegocioController";
import MaquinariaCamionController from "./controller/MaquinariaCamionController";
import MonitoreoGPSController from "./controller/MonitoreoGPSController";
import OficinaAdministrativaController from "./controller/OficinaAdministrativaController";
import PresupuestoController from "./controller/PresupuestoController";
import SedeController from "./controller/SedeController";
import ServicioConstruccionController from "./controller/ServicioConstruccionController";
import TransporteController from "./controller/TransporteController";
import defineRelations from "./models/relations";

const cors = require("cors");
const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
defineRelations();

app.use("/Empleado", EmpleadoController);
app.use("/Gasto", GastoController);
app.use("/GiroNegocio", GiroNegocioController);
app.use("/Presupuesto", PresupuestoController);
app.use("/MaquinariaCamion", MaquinariaCamionController);
app.use("/Monitoreogps", MonitoreoGPSController);
app.use("/OficinaAdministrativa", OficinaAdministrativaController);
app.use("/Sede", SedeController);
app.use("/ServicioConstruccion", ServicioConstruccionController);
app.use("/Transporte", TransporteController);

app.get("/", (req: Request, res: Response) => {
  res.send("Bienvenido a la API de Usuarios");
});

sequelize.sync({ force: false }).then(() => {
  app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
    console.log("Base de datos sincronizada");
  });
});
