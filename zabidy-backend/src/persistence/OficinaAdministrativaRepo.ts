import { OficinaAdministrativa } from "../models/OficinaAdministrativa";

export interface CreateOficinaAdministrativaParams {
  Ubicacion: string;
  Alquilada: boolean;
  SedeID: number;
}

export default class OficinaAdministrativaRepo {
  // Obtener todas las oficinas administrativas
  async ObtenerTodos() {
    return await OficinaAdministrativa.findAll();
  }

  // Crear una nueva oficina administrativa
  async CrearUno(params: CreateOficinaAdministrativaParams) {
    return await OficinaAdministrativa.create({ ...params });
  }

  // Actualizar todos los campos de una oficina administrativa
  async ActualizarTodosLosCampos(
    id: number,
    params: CreateOficinaAdministrativaParams
  ) {
    const oficina = await OficinaAdministrativa.findByPk(id);
    if (oficina) {
      await oficina.update({ ...params });
      return oficina;
    }
    throw new Error("Oficina Administrativa no encontrada");
  }

  // Desactivar una oficina administrativa
  async DesactivarUno(id: number) {
    const oficina = await OficinaAdministrativa.findByPk(id);
    if (oficina) {
      await oficina.update({ activa: false });
      return oficina;
    }
    throw new Error("Oficina Administrativa no encontrada");
  }

  // Obtener una oficina administrativa específica por ID
  async ObtenerUno(id: number) {
    return await OficinaAdministrativa.findByPk(id);
  }
}
