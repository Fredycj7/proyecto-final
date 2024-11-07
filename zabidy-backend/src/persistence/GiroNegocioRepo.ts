import { GiroNegocio } from "../models/GiroNegocio";

export interface CreateGiroNegocioParams {
  NombreGiro: string;
  Descripcion: string;
}

export default class GiroNegocioRepo {
  async ObtenerTodos() {
    return await GiroNegocio.findAll();
  }

  async CrearUno(params: CreateGiroNegocioParams) {
    return await GiroNegocio.create({ ...params });
  }

  async ActualizarTodosLosCampos(id: number, params: CreateGiroNegocioParams) {
    const giro = await GiroNegocio.findByPk(id);
    if (giro) {
      await giro.update({ ...params });
      return giro;
    }
    throw new Error("GiroNegocio not found");
  }

  async DesactivarUno(id: number) {
    const giro = await GiroNegocio.findByPk(id);
    if (giro) {
      await giro.update({ activo: false });
      return giro;
    }
    throw new Error("GiroNegocio not found");
  }

  async ObtenerUno(id: number) {
    return await GiroNegocio.findByPk(id);
  }
}
