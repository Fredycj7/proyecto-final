import { MaquinariaCamion } from "../models/MaquinariaCamion";

export interface CreateMaquinariaCamionParams {
  Tipo: string;
  Marca: string;
  Modelo: string;
  Año: number;
  GPSID: number;
}

export default class MaquinariaCamionRepo {
  async ObtenerTodos() {
    return await MaquinariaCamion.findAll();
  }

  async CrearUno(params: CreateMaquinariaCamionParams) {
    return await MaquinariaCamion.create({ ...params });
  }

  async ActualizarTodosLosCampos(
    id: number,
    params: CreateMaquinariaCamionParams
  ) {
    const maquinaria = await MaquinariaCamion.findByPk(id);
    if (maquinaria) {
      await maquinaria.update({ ...params });
      return maquinaria;
    }
    throw new Error("MaquinariaCamion not found");
  }

  async DesactivarUno(id: number) {
    const maquinaria = await MaquinariaCamion.findByPk(id);
    if (maquinaria) {
      await maquinaria.update({ activo: false });
      return maquinaria;
    }
    throw new Error("MaquinariaCamion not found");
  }

  async ObtenerUno(id: number) {
    return await MaquinariaCamion.findByPk(id);
  }
}
