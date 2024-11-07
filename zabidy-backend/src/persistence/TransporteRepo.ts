import { Transporte } from "../models/Transporte";

export interface CreateTransporteParams {
  Empresa: string;
  Origen: string;
  Destino: string;
  Fecha: Date;
  MaquinariaID: number;
}

export default class TransporteRepo {
  async ObtenerTodos() {
    return await Transporte.findAll();
  }

  async CrearUno(params: CreateTransporteParams) {
    return await Transporte.create({ ...params });
  }

  async ActualizarTodosLosCampos(id: number, params: CreateTransporteParams) {
    const transporte = await Transporte.findByPk(id);
    if (transporte) {
      await transporte.update({ ...params });
      return transporte;
    }
    throw new Error("Transporte not found");
  }

  async DesactivarUno(id: number) {
    const transporte = await Transporte.findByPk(id);
    if (transporte) {
      await transporte.update({ activo: false });
      return transporte;
    }
    throw new Error("Transporte not found");
  }

  async ObtenerUno(id: number) {
    return await Transporte.findByPk(id);
  }
}
