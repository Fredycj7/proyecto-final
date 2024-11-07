import ServicioConstruccionRepo from "../persistence/ServicioConstruccionRepo";
import { BusinessException } from "../infrastructure/errors";
import { StatusCodes } from "../infrastructure/status-codes";

// DTOs
export interface CreateServicioConstruccionParams {
  Descripcion: string;
  Ubicacion: string;
  FechaInicio: Date;
  FechaFin: Date;
  GiroID: number;
}

export interface ServicioConstruccionResponse {
  ServicioID: number;
  Descripcion: string;
  Ubicacion: string;
  FechaInicio: Date;
  FechaFin: Date;
  GiroID: number;
}

export default class ServicioConstruccionService {
  constructor(private servicioRepo: ServicioConstruccionRepo) {}

  async ObtenerTodos(): Promise<ServicioConstruccionResponse[]> {
    const servicios = await this.servicioRepo.ObtenerTodos();
    return servicios.map((servicio) => ({
      ServicioID: servicio.ServicioID,
      Descripcion: servicio.Descripcion,
      Ubicacion: servicio.Ubicacion,
      FechaInicio: servicio.FechaInicio,
      FechaFin: servicio.FechaFin,
      GiroID: servicio.GiroID,
    }));
  }

  async CrearUno(
    params: CreateServicioConstruccionParams
  ): Promise<ServicioConstruccionResponse> {
    const servicio = await this.servicioRepo.CrearUno(params);
    if (!servicio) {
      throw new BusinessException(
        "Error creando servicio de construcción",
        StatusCodes.CONFLICT
      );
    }
    return {
      ServicioID: servicio.ServicioID,
      Descripcion: servicio.Descripcion,
      Ubicacion: servicio.Ubicacion,
      FechaInicio: servicio.FechaInicio,
      FechaFin: servicio.FechaFin,
      GiroID: servicio.GiroID,
    };
  }

  async ActualizarTodosLosCampos(
    id: number,
    params: CreateServicioConstruccionParams
  ): Promise<ServicioConstruccionResponse> {
    const servicio = await this.servicioRepo.ActualizarTodosLosCampos(
      id,
      params
    );
    if (!servicio) {
      throw new BusinessException(
        "Servicio de construcción no encontrado",
        StatusCodes.NOT_FOUND
      );
    }
    return {
      ServicioID: servicio.ServicioID,
      Descripcion: servicio.Descripcion,
      Ubicacion: servicio.Ubicacion,
      FechaInicio: servicio.FechaInicio,
      FechaFin: servicio.FechaFin,
      GiroID: servicio.GiroID,
    };
  }

  async DesactivarUno(id: number): Promise<void> {
    const servicio = await this.servicioRepo.DesactivarUno(id);
    if (!servicio) {
      throw new BusinessException(
        "Servicio de construcción no encontrado",
        StatusCodes.NOT_FOUND
      );
    }
  }

  async ObtenerUno(id: number): Promise<ServicioConstruccionResponse> {
    const servicio = await this.servicioRepo.ObtenerUno(id);
    if (!servicio) {
      throw new BusinessException(
        "Servicio de construcción no encontrado",
        StatusCodes.NOT_FOUND
      );
    }
    return {
      ServicioID: servicio.ServicioID,
      Descripcion: servicio.Descripcion,
      Ubicacion: servicio.Ubicacion,
      FechaInicio: servicio.FechaInicio,
      FechaFin: servicio.FechaFin,
      GiroID: servicio.GiroID,
    };
  }
}
