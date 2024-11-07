import MonitoreoGPSRepo from "../persistence/MonitoreoGPSRepo";
import { BusinessException } from "../infrastructure/errors";
import { StatusCodes } from "../infrastructure/status-codes";

// DTOs
export interface CreateMonitoreoGPSParams {
  MaquinariaID: number;
  FechaHora: Date;
  Latitud: number;
  Longitud: number;
  Velocidad: number;
  TiempoUso: number;
}

export interface MonitoreoGPSResponse {
  MonitoreoID: number;
  MaquinariaID: number;
  FechaHora: Date;
  Latitud: number;
  Longitud: number;
  Velocidad: number;
  TiempoUso: number;
}

export default class MonitoreoGPSService {
  constructor(private monitoreoRepo: MonitoreoGPSRepo) {}

  async ObtenerTodos(): Promise<MonitoreoGPSResponse[]> {
    const monitoreos = await this.monitoreoRepo.ObtenerTodos();
    return monitoreos.map((monitoreo) => ({
      MonitoreoID: monitoreo.MonitoreoID,
      MaquinariaID: monitoreo.MaquinariaID,
      FechaHora: monitoreo.FechaHora,
      Latitud: monitoreo.Latitud,
      Longitud: monitoreo.Longitud,
      Velocidad: monitoreo.Velocidad,
      TiempoUso: monitoreo.TiempoUso,
    }));
  }

  async CrearUno(
    params: CreateMonitoreoGPSParams
  ): Promise<MonitoreoGPSResponse> {
    const monitoreo = await this.monitoreoRepo.CrearUno(params);
    if (!monitoreo) {
      throw new BusinessException(
        "Error creando monitoreo GPS",
        StatusCodes.CONFLICT
      );
    }
    return {
      MonitoreoID: monitoreo.MonitoreoID,
      MaquinariaID: monitoreo.MaquinariaID,
      FechaHora: monitoreo.FechaHora,
      Latitud: monitoreo.Latitud,
      Longitud: monitoreo.Longitud,
      Velocidad: monitoreo.Velocidad,
      TiempoUso: monitoreo.TiempoUso,
    };
  }

  async ActualizarTodosLosCampos(
    id: number,
    params: CreateMonitoreoGPSParams
  ): Promise<MonitoreoGPSResponse> {
    const monitoreo = await this.monitoreoRepo.ActualizarTodosLosCampos(
      id,
      params
    );
    if (!monitoreo) {
      throw new BusinessException(
        "Monitoreo GPS no encontrado",
        StatusCodes.NOT_FOUND
      );
    }
    return {
      MonitoreoID: monitoreo.MonitoreoID,
      MaquinariaID: monitoreo.MaquinariaID,
      FechaHora: monitoreo.FechaHora,
      Latitud: monitoreo.Latitud,
      Longitud: monitoreo.Longitud,
      Velocidad: monitoreo.Velocidad,
      TiempoUso: monitoreo.TiempoUso,
    };
  }

  async DesactivarUno(id: number): Promise<void> {
    const monitoreo = await this.monitoreoRepo.DesactivarUno(id);
    if (!monitoreo) {
      throw new BusinessException(
        "Monitoreo GPS no encontrado",
        StatusCodes.NOT_FOUND
      );
    }
  }

  async ObtenerUno(id: number): Promise<MonitoreoGPSResponse> {
    const monitoreo = await this.monitoreoRepo.ObtenerUno(id);
    if (!monitoreo) {
      throw new BusinessException(
        "Monitoreo GPS no encontrado",
        StatusCodes.NOT_FOUND
      );
    }
    return {
      MonitoreoID: monitoreo.MonitoreoID,
      MaquinariaID: monitoreo.MaquinariaID,
      FechaHora: monitoreo.FechaHora,
      Latitud: monitoreo.Latitud,
      Longitud: monitoreo.Longitud,
      Velocidad: monitoreo.Velocidad,
      TiempoUso: monitoreo.TiempoUso,
    };
  }
}
