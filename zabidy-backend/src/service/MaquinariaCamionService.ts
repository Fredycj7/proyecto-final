import MaquinariaCamionRepo from "../persistence/MaquinariaCamionRepo";
import { BusinessException } from "../infrastructure/errors";
import { StatusCodes } from "../infrastructure/status-codes";

// DTOs
export interface CreateMaquinariaCamionParams {
  Tipo: string;
  Marca: string;
  Modelo: string;
  Año: number;
  GPSID: number;
}

export interface MaquinariaCamionResponse {
  MaquinariaID: number;
  Tipo: string;
  Marca: string;
  Modelo: string;
  Año: number;
  GPSID: number;
}

export default class MaquinariaCamionService {
  constructor(private maquinariaRepo: MaquinariaCamionRepo) {}

  async ObtenerTodos(): Promise<MaquinariaCamionResponse[]> {
    const maquinarias = await this.maquinariaRepo.ObtenerTodos();
    return maquinarias.map((maquinaria) => ({
      MaquinariaID: maquinaria.MaquinariaID,
      Tipo: maquinaria.Tipo,
      Marca: maquinaria.Marca,
      Modelo: maquinaria.Modelo,
      Año: maquinaria.Año,
      GPSID: maquinaria.GPSID,
    }));
  }

  async CrearUno(
    params: CreateMaquinariaCamionParams
  ): Promise<MaquinariaCamionResponse> {
    const maquinaria = await this.maquinariaRepo.CrearUno(params);
    if (!maquinaria) {
      throw new BusinessException(
        "Error creando maquinaria",
        StatusCodes.CONFLICT
      );
    }
    return {
      MaquinariaID: maquinaria.MaquinariaID,
      Tipo: maquinaria.Tipo,
      Marca: maquinaria.Marca,
      Modelo: maquinaria.Modelo,
      Año: maquinaria.Año,
      GPSID: maquinaria.GPSID,
    };
  }

  async ActualizarTodosLosCampos(
    id: number,
    params: CreateMaquinariaCamionParams
  ): Promise<MaquinariaCamionResponse> {
    const maquinaria = await this.maquinariaRepo.ActualizarTodosLosCampos(
      id,
      params
    );
    if (!maquinaria) {
      throw new BusinessException(
        "Maquinaria no encontrada",
        StatusCodes.NOT_FOUND
      );
    }
    return {
      MaquinariaID: maquinaria.MaquinariaID,
      Tipo: maquinaria.Tipo,
      Marca: maquinaria.Marca,
      Modelo: maquinaria.Modelo,
      Año: maquinaria.Año,
      GPSID: maquinaria.GPSID,
    };
  }

  async DesactivarUno(id: number): Promise<void> {
    const maquinaria = await this.maquinariaRepo.DesactivarUno(id);
    if (!maquinaria) {
      throw new BusinessException(
        "Maquinaria no encontrada",
        StatusCodes.NOT_FOUND
      );
    }
  }

  async ObtenerUno(id: number): Promise<MaquinariaCamionResponse> {
    const maquinaria = await this.maquinariaRepo.ObtenerUno(id);
    if (!maquinaria) {
      throw new BusinessException(
        "Maquinaria no encontrada",
        StatusCodes.NOT_FOUND
      );
    }
    return {
      MaquinariaID: maquinaria.MaquinariaID,
      Tipo: maquinaria.Tipo,
      Marca: maquinaria.Marca,
      Modelo: maquinaria.Modelo,
      Año: maquinaria.Año,
      GPSID: maquinaria.GPSID,
    };
  }
}
