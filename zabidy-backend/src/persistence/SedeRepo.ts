import { Sede } from "../models/Sede";

export interface CreateSedeParams {
  NombreSede: string;
  Ubicacion: string;
}

export default class SedeRepo {
  async ObtenerTodos() {
    return await Sede.findAll();
  }

  async CrearUno(params: CreateSedeParams) {
    return await Sede.create({ ...params });
  }

  async ActualizarTodosLosCampos(id: number, params: CreateSedeParams) {
    const sede = await Sede.findByPk(id);
    if (sede) {
      await sede.update({ ...params });
      return sede;
    }
    throw new Error("Sede not found");
  }

  async DesactivarUno(id: number) {
    const sede = await Sede.findByPk(id);
    if (sede) {
      await sede.update({ activo: false });
      return sede;
    }
    throw new Error("Sede not found");
  }

  async ObtenerUno(id: number) {
    return await Sede.findByPk(id);
  }
}
