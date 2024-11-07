import { Router, Request, Response } from "express";
import OficinaAdministrativaService from "../service/OficinaAdministrativaService";
import OficinaAdministrativaRepo from "../persistence/OficinaAdministrativaRepo";
import { handleError } from "../infrastructure/middlewares/handler-error";
import { authenticate } from "../infrastructure/middlewares/auth";

const oficinaAdministrativaRepo = new OficinaAdministrativaRepo();
const oficinaAdministrativaService = new OficinaAdministrativaService(
  oficinaAdministrativaRepo
);
const router = Router();

router.get(
  "/",

  handleError(async (req: Request, res: Response) => {
    const oficinas = await oficinaAdministrativaService.ObtenerTodos();
    res.json(oficinas);
  })
);

router.get(
  "/:id",

  handleError(async (req: Request, res: Response) => {
    const oficina = await oficinaAdministrativaService.ObtenerUno(
      Number(req.params.id)
    );
    res.json(oficina);
  })
);

router.post(
  "/",
  handleError(async (req: Request, res: Response) => {
    const oficina = await oficinaAdministrativaService.CrearUno(req.body);
    res.json(oficina);
  })
);

router.put(
  "/:id",

  handleError(async (req: Request, res: Response) => {
    const oficina = await oficinaAdministrativaService.ActualizarTodosLosCampos(
      Number(req.params.id),
      req.body
    );
    res.json(oficina);
  })
);

router.delete(
  "/:id",

  handleError(async (req: Request, res: Response) => {
    await oficinaAdministrativaService.DesactivarUno(Number(req.params.id));
    res.json({ message: "OficinaAdministrativa desactivada con éxito" });
  })
);

export default router;
