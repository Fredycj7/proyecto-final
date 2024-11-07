import { Presupuesto } from "../models/Presupuesto";

export interface CreatePresupuestoParams {
  GiroID: number;
  Monto: number;
  FechaInicio: Date;
  FechaFin: Date;
}

export default class PresupuestoRepo {
  async ObtenerTodos() {
    return await Presupuesto.findAll();
  }

  async CrearUno(params: CreatePresupuestoParams) {
    return await Presupuesto.create({ ...params });
  }

  async ActualizarTodosLosCampos(id: number, params: CreatePresupuestoParams) {
    const presupuesto = await Presupuesto.findByPk(id);
    if (presupuesto) {
      await presupuesto.update({ ...params });
      return presupuesto;
    }
    throw new Error("Presupuesto not found");
  }

  async DesactivarUno(id: number) {
    const presupuesto = await Presupuesto.findByPk(id);
    if (presupuesto) {
      await presupuesto.update({ activo: false });
      return presupuesto;
    }
    throw new Error("Presupuesto not found");
  }

  async ObtenerUno(id: number) {
    return await Presupuesto.findByPk(id);
  }
}
