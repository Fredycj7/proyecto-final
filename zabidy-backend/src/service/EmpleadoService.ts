import EmpleadoRepo from "../persistence/EmpleadoRepo";
import { BusinessException } from "../infrastructure/errors";
import { StatusCodes } from "../infrastructure/status-codes";

// DTOs
export interface CreateEmpleadoParams {
  Nombre: string;
  Cargo: string;
  SedeID: number;
}

export interface EmpleadoResponse {
  EmpleadoID: number;
  Nombre: string;
  Cargo: string;
  SedeID: number;
}

export default class EmpleadoService {
  constructor(private empleadoRepo: EmpleadoRepo) {}

  async ObtenerTodos(): Promise<EmpleadoResponse[]> {
    const empleados = await this.empleadoRepo.ObtenerTodos();
    return empleados.map((empleado) => ({
      EmpleadoID: empleado.EmpleadoID,
      Nombre: empleado.Nombre,
      Cargo: empleado.Cargo,
      SedeID: empleado.SedeID,
    }));
  }

  async CrearUno(params: CreateEmpleadoParams): Promise<EmpleadoResponse> {
    const empleado = await this.empleadoRepo.CrearUno(params);
    if (!empleado) {
      throw new BusinessException(
        "Error creando empleado",
        StatusCodes.CONFLICT
      );
    }
    return {
      EmpleadoID: empleado.EmpleadoID,
      Nombre: empleado.Nombre,
      Cargo: empleado.Cargo,
      SedeID: empleado.SedeID,
    };
  }

  async ActualizarTodosLosCampos(
    id: number,
    params: CreateEmpleadoParams
  ): Promise<EmpleadoResponse> {
    const empleado = await this.empleadoRepo.ActualizarTodosLosCampos(
      id,
      params
    );
    if (!empleado) {
      throw new BusinessException(
        "Empleado no encontrado",
        StatusCodes.NOT_FOUND
      );
    }
    return {
      EmpleadoID: empleado.EmpleadoID,
      Nombre: empleado.Nombre,
      Cargo: empleado.Cargo,
      SedeID: empleado.SedeID,
    };
  }

  async DesactivarUno(id: number): Promise<void> {
    const empleado = await this.empleadoRepo.DesactivarUno(id);
    if (!empleado) {
      throw new BusinessException(
        "Empleado no encontrado",
        StatusCodes.NOT_FOUND
      );
    }
  }

  async ObtenerUno(id: number): Promise<EmpleadoResponse> {
    const empleado = await this.empleadoRepo.ObtenerUno(id);
    if (!empleado) {
      throw new BusinessException(
        "Empleado no encontrado",
        StatusCodes.NOT_FOUND
      );
    }
    return {
      EmpleadoID: empleado.EmpleadoID,
      Nombre: empleado.Nombre,
      Cargo: empleado.Cargo,
      SedeID: empleado.SedeID,
    };
  }
}
