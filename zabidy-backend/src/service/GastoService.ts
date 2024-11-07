import GastoRepo from "../persistence/GastoRepo";
import { BusinessException } from "../infrastructure/errors";
import { StatusCodes } from "../infrastructure/status-codes";

// DTOs
export interface CreateGastoParams {
  GiroID: number;
  Descripcion: string;
  Monto: number;
  Fecha: Date;
}

export interface GastoResponse {
  GastoID: number;
  GiroID: number;
  Descripcion: string;
  Monto: number;
  Fecha: Date;
}

export default class GastoService {
  constructor(private gastoRepo: GastoRepo) {}

  async ObtenerTodos(): Promise<GastoResponse[]> {
    const gastos = await this.gastoRepo.ObtenerTodos();
    return gastos.map((gasto) => ({
      GastoID: gasto.GastoID,
      GiroID: gasto.GiroID,
      Descripcion: gasto.Descripcion,
      Monto: gasto.Monto,
      Fecha: gasto.Fecha,
    }));
  }

  async CrearUno(params: CreateGastoParams): Promise<GastoResponse> {
    const gasto = await this.gastoRepo.CrearUno(params);
    if (!gasto) {
      throw new BusinessException("Error creando gasto", StatusCodes.CONFLICT);
    }
    return {
      GastoID: gasto.GastoID,
      GiroID: gasto.GiroID,
      Descripcion: gasto.Descripcion,
      Monto: gasto.Monto,
      Fecha: gasto.Fecha,
    };
  }

  async ActualizarTodosLosCampos(
    id: number,
    params: CreateGastoParams
  ): Promise<GastoResponse> {
    const gasto = await this.gastoRepo.ActualizarTodosLosCampos(id, params);
    if (!gasto) {
      throw new BusinessException("Gasto no encontrado", StatusCodes.NOT_FOUND);
    }
    return {
      GastoID: gasto.GastoID,
      GiroID: gasto.GiroID,
      Descripcion: gasto.Descripcion,
      Monto: gasto.Monto,
      Fecha: gasto.Fecha,
    };
  }

  async DesactivarUno(id: number): Promise<void> {
    const gasto = await this.gastoRepo.DesactivarUno(id);
    if (!gasto) {
      throw new BusinessException("Gasto no encontrado", StatusCodes.NOT_FOUND);
    }
  }

  async ObtenerUno(id: number): Promise<GastoResponse> {
    const gasto = await this.gastoRepo.ObtenerUno(id);
    if (!gasto) {
      throw new BusinessException("Gasto no encontrado", StatusCodes.NOT_FOUND);
    }
    return {
      GastoID: gasto.GastoID,
      GiroID: gasto.GiroID,
      Descripcion: gasto.Descripcion,
      Monto: gasto.Monto,
      Fecha: gasto.Fecha,
    };
  }
}
