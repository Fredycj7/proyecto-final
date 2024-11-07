import SedeRepo from "../persistence/SedeRepo";
import { BusinessException } from "../infrastructure/errors";
import { StatusCodes } from "../infrastructure/status-codes";

// DTOs
export interface CreateSedeParams {
  NombreSede: string;
  Ubicacion: string;
}

export interface SedeResponse {
  SedeID: number;
  NombreSede: string;
  Ubicacion: string;
}

export default class SedeService {
  constructor(private sedeRepo: SedeRepo) {}

  async ObtenerTodos(): Promise<SedeResponse[]> {
    const sedes = await this.sedeRepo.ObtenerTodos();
    return sedes.map((sede) => ({
      SedeID: sede.SedeID,
      NombreSede: sede.NombreSede,
      Ubicacion: sede.Ubicacion,
    }));
  }

  async CrearUno(params: CreateSedeParams): Promise<SedeResponse> {
    const sede = await this.sedeRepo.CrearUno(params);
    if (!sede) {
      throw new BusinessException("Error creando sede", StatusCodes.CONFLICT);
    }
    return {
      SedeID: sede.SedeID,
      NombreSede: sede.NombreSede,
      Ubicacion: sede.Ubicacion,
    };
  }

  async ActualizarTodosLosCampos(
    id: number,
    params: CreateSedeParams
  ): Promise<SedeResponse> {
    const sede = await this.sedeRepo.ActualizarTodosLosCampos(id, params);
    if (!sede) {
      throw new BusinessException("Sede no encontrada", StatusCodes.NOT_FOUND);
    }
    return {
      SedeID: sede.SedeID,
      NombreSede: sede.NombreSede,
      Ubicacion: sede.Ubicacion,
    };
  }

  async DesactivarUno(id: number): Promise<void> {
    const sede = await this.sedeRepo.DesactivarUno(id);
    if (!sede) {
      throw new BusinessException("Sede no encontrada", StatusCodes.NOT_FOUND);
    }
  }

  async ObtenerUno(id: number): Promise<SedeResponse> {
    const sede = await this.sedeRepo.ObtenerUno(id);
    if (!sede) {
      throw new BusinessException("Sede no encontrada", StatusCodes.NOT_FOUND);
    }
    return {
      SedeID: sede.SedeID,
      NombreSede: sede.NombreSede,
      Ubicacion: sede.Ubicacion,
    };
  }
}
