import TransporteRepo from "../persistence/TransporteRepo";
import { BusinessException } from "../infrastructure/errors";
import { StatusCodes } from "../infrastructure/status-codes";

// DTOs
export interface CreateTransporteParams {
  Empresa: string;
  Origen: string;
  Destino: string;
  Fecha: Date;
  MaquinariaID: number;
}

export interface TransporteResponse {
  TransporteID: number;
  Empresa: string;
  Origen: string;
  Destino: string;
  Fecha: Date;
  MaquinariaID: number;
}

export default class TransporteService {
  constructor(private transporteRepo: TransporteRepo) {}

  async ObtenerTodos(): Promise<TransporteResponse[]> {
    const transportes = await this.transporteRepo.ObtenerTodos();
    return transportes.map((transporte) => ({
      TransporteID: transporte.TransporteID,
      Empresa: transporte.Empresa,
      Origen: transporte.Origen,
      Destino: transporte.Destino,
      Fecha: transporte.Fecha,
      MaquinariaID: transporte.MaquinariaID,
    }));
  }

  async CrearUno(params: CreateTransporteParams): Promise<TransporteResponse> {
    const transporte = await this.transporteRepo.CrearUno(params);
    if (!transporte) {
      throw new BusinessException(
        "Error creando transporte",
        StatusCodes.CONFLICT
      );
    }
    return {
      TransporteID: transporte.TransporteID,
      Empresa: transporte.Empresa,
      Origen: transporte.Origen,
      Destino: transporte.Destino,
      Fecha: transporte.Fecha,
      MaquinariaID: transporte.MaquinariaID,
    };
  }

  async ActualizarTodosLosCampos(
    id: number,
    params: CreateTransporteParams
  ): Promise<TransporteResponse> {
    const transporte = await this.transporteRepo.ActualizarTodosLosCampos(
      id,
      params
    );
    if (!transporte) {
      throw new BusinessException(
        "Transporte no encontrado",
        StatusCodes.NOT_FOUND
      );
    }
    return {
      TransporteID: transporte.TransporteID,
      Empresa: transporte.Empresa,
      Origen: transporte.Origen,
      Destino: transporte.Destino,
      Fecha: transporte.Fecha,
      MaquinariaID: transporte.MaquinariaID,
    };
  }

  async DesactivarUno(id: number): Promise<void> {
    const transporte = await this.transporteRepo.DesactivarUno(id);
    if (!transporte) {
      throw new BusinessException(
        "Transporte no encontrado",
        StatusCodes.NOT_FOUND
      );
    }
  }

  async ObtenerUno(id: number): Promise<TransporteResponse> {
    const transporte = await this.transporteRepo.ObtenerUno(id);
    if (!transporte) {
      throw new BusinessException(
        "Transporte no encontrado",
        StatusCodes.NOT_FOUND
      );
    }
    return {
      TransporteID: transporte.TransporteID,
      Empresa: transporte.Empresa,
      Origen: transporte.Origen,
      Destino: transporte.Destino,
      Fecha: transporte.Fecha,
      MaquinariaID: transporte.MaquinariaID,
    };
  }
}
