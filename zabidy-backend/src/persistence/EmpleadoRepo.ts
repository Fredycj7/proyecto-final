import { Empleado } from "../models/Empleado";

export interface CreateEmpleadoParams {
  Nombre: string;
  Cargo: string;
  SedeID: number;
}

export default class EmpleadoRepo {
  async ObtenerTodos() {
    return await Empleado.findAll();
  }

  async CrearUno(params: CreateEmpleadoParams) {
    return await Empleado.create({ ...params });
  }

  async ActualizarTodosLosCampos(id: number, params: CreateEmpleadoParams) {
    const empleado = await Empleado.findByPk(id);
    if (empleado) {
      await empleado.update({ ...params });
      return empleado;
    }
    throw new Error("Empleado not found");
  }

  async DesactivarUno(id: number) {
    const empleado = await Empleado.findByPk(id);
    if (empleado) {
      await empleado.update({ activo: false });
      return empleado;
    }
    throw new Error("Empleado not found");
  }

  async ObtenerUno(id: number) {
    return await Empleado.findByPk(id);
  }
}
