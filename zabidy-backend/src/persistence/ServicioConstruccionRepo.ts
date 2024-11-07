import { ServicioConstruccion } from "../models/ServicioConstruccion";

export interface CreateServicioConstruccionParams {
  Descripcion: string;
  Ubicacion: string;
  FechaInicio: Date;
  FechaFin: Date;
  GiroID: number;
}

export default class ServicioConstruccionRepo {
  async ObtenerTodos() {
    return await ServicioConstruccion.findAll();
  }

  async CrearUno(params: CreateServicioConstruccionParams) {
    return await ServicioConstruccion.create({ ...params });
  }

  async ActualizarTodosLosCampos(
    id: number,
    params: CreateServicioConstruccionParams
  ) {
    const servicio = await ServicioConstruccion.findByPk(id);
    if (servicio) {
      await servicio.update({ ...params });
      return servicio;
    }
    throw new Error("ServicioConstruccion not found");
  }

  async DesactivarUno(id: number) {
    const servicio = await ServicioConstruccion.findByPk(id);
    if (servicio) {
      await servicio.update({ activo: false });
      return servicio;
    }
    throw new Error("ServicioConstruccion not found");
  }

  async ObtenerUno(id: number) {
    return await ServicioConstruccion.findByPk(id);
  }
}
