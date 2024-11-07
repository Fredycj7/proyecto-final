import { MonitoreoGPS } from "../models/MonitoreoGPS";

export interface CreateMonitoreoGPSParams {
  MaquinariaID: number;
  FechaHora: Date;
  Latitud: number;
  Longitud: number;
  Velocidad: number;
  TiempoUso: number;
}

export default class MonitoreoGPSRepo {
  async ObtenerTodos() {
    return await MonitoreoGPS.findAll();
  }

  async CrearUno(params: CreateMonitoreoGPSParams) {
    return await MonitoreoGPS.create({ ...params });
  }

  async ActualizarTodosLosCampos(id: number, params: CreateMonitoreoGPSParams) {
    const monitoreo = await MonitoreoGPS.findByPk(id);
    if (monitoreo) {
      await monitoreo.update({ ...params });
      return monitoreo;
    }
    throw new Error("MonitoreoGPS not found");
  }

  async DesactivarUno(id: number) {
    const monitoreo = await MonitoreoGPS.findByPk(id);
    if (monitoreo) {
      await monitoreo.update({ activo: false });
      return monitoreo;
    }
    throw new Error("MonitoreoGPS not found");
  }

  async ObtenerUno(id: number) {
    return await MonitoreoGPS.findByPk(id);
  }
}
