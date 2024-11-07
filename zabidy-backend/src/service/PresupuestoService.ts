import PresupuestoRepo from "../persistence/PresupuestoRepo";
import { BusinessException } from "../infrastructure/errors";
import { StatusCodes } from "../infrastructure/status-codes";

export interface CreatePresupuestoParams {
  GiroID: number;
  Monto: number;
  FechaInicio: Date;
  FechaFin: Date;
}

export default class PresupuestoService {
  constructor(private presupuestoRepo: PresupuestoRepo) {}

  async ObtenerTodos() {
    return await this.presupuestoRepo.ObtenerTodos();
  }

  async CrearUno(params: CreatePresupuestoParams) {
    const presupuesto = await this.presupuestoRepo.CrearUno(params);
    if (!presupuesto) {
      throw new BusinessException(
        "Error creando presupuesto",
        StatusCodes.CONFLICT
      );
    }
    return presupuesto;
  }

  async ActualizarTodosLosCampos(id: number, params: CreatePresupuestoParams) {
    const presupuesto = await this.presupuestoRepo.ActualizarTodosLosCampos(
      id,
      params
    );
    if (!presupuesto) {
      throw new BusinessException(
        "Presupuesto no encontrado",
        StatusCodes.NOT_FOUND
      );
    }
    return presupuesto;
  }

  async DesactivarUno(id: number) {
    const presupuesto = await this.presupuestoRepo.DesactivarUno(id);
    if (!presupuesto) {
      throw new BusinessException(
        "Presupuesto no encontrado",
        StatusCodes.NOT_FOUND
      );
    }
    return presupuesto;
  }

  async ObtenerUno(id: number) {
    const presupuesto = await this.presupuestoRepo.ObtenerUno(id);
    if (!presupuesto) {
      throw new BusinessException(
        "Presupuesto no encontrado",
        StatusCodes.NOT_FOUND
      );
    }
    return presupuesto;
  }
}
