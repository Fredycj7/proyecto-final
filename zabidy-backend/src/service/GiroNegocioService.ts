import GiroNegocioRepo from "../persistence/GiroNegocioRepo";
import { BusinessException } from "../infrastructure/errors";
import { StatusCodes } from "../infrastructure/status-codes";

// DTOs
export interface CreateGiroNegocioParams {
  NombreGiro: string;
  Descripcion: string;
}

export interface GiroNegocioResponse {
  GiroID: number;
  NombreGiro: string;
  Descripcion: string;
}

export default class GiroNegocioService {
  constructor(private giroNegocioRepo: GiroNegocioRepo) {}

  async ObtenerTodos(): Promise<GiroNegocioResponse[]> {
    const giros = await this.giroNegocioRepo.ObtenerTodos();
    return giros.map((giro) => ({
      GiroID: giro.GiroID,
      NombreGiro: giro.NombreGiro,
      Descripcion: giro.Descripcion,
    }));
  }

  async CrearUno(
    params: CreateGiroNegocioParams
  ): Promise<GiroNegocioResponse> {
    const giro = await this.giroNegocioRepo.CrearUno(params);
    if (!giro) {
      throw new BusinessException(
        "Error creando giro de negocio",
        StatusCodes.CONFLICT
      );
    }
    return {
      GiroID: giro.GiroID,
      NombreGiro: giro.NombreGiro,
      Descripcion: giro.Descripcion,
    };
  }

  async ActualizarTodosLosCampos(
    id: number,
    params: CreateGiroNegocioParams
  ): Promise<GiroNegocioResponse> {
    const giro = await this.giroNegocioRepo.ActualizarTodosLosCampos(
      id,
      params
    );
    if (!giro) {
      throw new BusinessException(
        "Giro de negocio no encontrado",
        StatusCodes.NOT_FOUND
      );
    }
    return {
      GiroID: giro.GiroID,
      NombreGiro: giro.NombreGiro,
      Descripcion: giro.Descripcion,
    };
  }

  async DesactivarUno(id: number): Promise<void> {
    const giro = await this.giroNegocioRepo.DesactivarUno(id);
    if (!giro) {
      throw new BusinessException(
        "Giro de negocio no encontrado",
        StatusCodes.NOT_FOUND
      );
    }
  }

  async ObtenerUno(id: number): Promise<GiroNegocioResponse> {
    const giro = await this.giroNegocioRepo.ObtenerUno(id);
    if (!giro) {
      throw new BusinessException(
        "Giro de negocio no encontrado",
        StatusCodes.NOT_FOUND
      );
    }
    return {
      GiroID: giro.GiroID,
      NombreGiro: giro.NombreGiro,
      Descripcion: giro.Descripcion,
    };
  }
}
