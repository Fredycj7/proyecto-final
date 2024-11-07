import { Gasto } from "../models/Gasto";

export interface CreateGastoParams {
  GiroID: number;
  Descripcion: string;
  Monto: number;
  Fecha: Date;
}

export default class GastoRepo {
  async ObtenerTodos() {
    return await Gasto.findAll();
  }

  async CrearUno(params: CreateGastoParams) {
    console.log({ params });

    return await Gasto.create({ ...params });
  }

  async ActualizarTodosLosCampos(id: number, params: CreateGastoParams) {
    const gasto = await Gasto.findByPk(id);
    if (gasto) {
      await gasto.update({ ...params });
      return gasto;
    }
    throw new Error("Gasto not found");
  }

  async DesactivarUno(id: number) {
    const gasto = await Gasto.findByPk(id);
    if (gasto) {
      await gasto.update({ activo: false });
      return gasto;
    }
    throw new Error("Gasto not found");
  }

  async ObtenerUno(id: number) {
    return await Gasto.findByPk(id);
  }
}
