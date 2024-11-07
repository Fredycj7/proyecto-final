import { BusinessException } from "../infrastructure/errors";
import { StatusCodes } from "../infrastructure/status-codes";
import OficinaAdministrativaRepo from "../persistence/OficinaAdministrativaRepo";

// DTOs
export interface CreateOficinaAdministrativaParams {
  Ubicacion: string;
  Alquilada: boolean;
  SedeID: number;
}

export interface OficinaAdministrativaResponse {
  OficinaID: number;
  Ubicacion: string;
  Alquilada: boolean;
  SedeID: number;
}

export default class OficinaAdministrativaService {
  constructor(private oficinaRepo: OficinaAdministrativaRepo) {}

  async ObtenerTodos(): Promise<OficinaAdministrativaResponse[]> {
    const oficinas = await this.oficinaRepo.ObtenerTodos();
    return oficinas.map((oficina) => ({
      OficinaID: oficina.OficinaID,
      Ubicacion: oficina.Ubicacion,
      Alquilada: oficina.Alquilada,
      SedeID: oficina.SedeID,
    }));
  }

  async CrearUno(
    params: CreateOficinaAdministrativaParams
  ): Promise<OficinaAdministrativaResponse> {
    const oficina = await this.oficinaRepo.CrearUno(params);
    if (!oficina) {
      throw new BusinessException(
        "Error creando oficina administrativa",
        StatusCodes.CONFLICT
      );
    }
    return {
      OficinaID: oficina.OficinaID,
      Ubicacion: oficina.Ubicacion,
      Alquilada: oficina.Alquilada,
      SedeID: oficina.SedeID,
    };
  }

  async ActualizarTodosLosCampos(
    id: number,
    params: CreateOficinaAdministrativaParams
  ): Promise<OficinaAdministrativaResponse> {
    const oficina = await this.oficinaRepo.ActualizarTodosLosCampos(id, params);
    if (!oficina) {
      throw new BusinessException(
        "Oficina administrativa no encontrada",
        StatusCodes.NOT_FOUND
      );
    }
    return {
      OficinaID: oficina.OficinaID,
      Ubicacion: oficina.Ubicacion,
      Alquilada: oficina.Alquilada,
      SedeID: oficina.SedeID,
    };
  }

  async DesactivarUno(id: number): Promise<void> {
    const oficina = await this.oficinaRepo.DesactivarUno(id);
    if (!oficina) {
      throw new BusinessException(
        "Oficina administrativa no encontrada",
        StatusCodes.NOT_FOUND
      );
    }
  }

  async ObtenerUno(id: number): Promise<OficinaAdministrativaResponse> {
    const oficina = await this.oficinaRepo.ObtenerUno(id);
    if (!oficina) {
      throw new BusinessException(
        "Oficina administrativa no encontrada",
        StatusCodes.NOT_FOUND
      );
    }
    return {
      OficinaID: oficina.OficinaID,
      Ubicacion: oficina.Ubicacion,
      Alquilada: oficina.Alquilada,
      SedeID: oficina.SedeID,
    };
  }
}
