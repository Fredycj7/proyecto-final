import { Router, Request, Response } from "express";
import ServicioConstruccionService from "../service/ServicioConstruccionService";
import ServicioConstruccionRepo from "../persistence/ServicioConstruccionRepo";
import { handleError } from "../infrastructure/middlewares/handler-error";
import { authenticate } from "../infrastructure/middlewares/auth";

const servicioConstruccionRepo = new ServicioConstruccionRepo();
const servicioConstruccionService = new ServicioConstruccionService(
  servicioConstruccionRepo
);
const router = Router();

router.get(
  "/",

  handleError(async (req: Request, res: Response) => {
    const servicios = await servicioConstruccionService.ObtenerTodos();
    res.json(servicios);
  })
);

router.get(
  "/:id",

  handleError(async (req: Request, res: Response) => {
    const servicio = await servicioConstruccionService.ObtenerUno(
      Number(req.params.id)
    );
    res.json(servicio);
  })
);

router.post(
  "/",
  handleError(async (req: Request, res: Response) => {
    const servicio = await servicioConstruccionService.CrearUno(req.body);
    res.json(servicio);
  })
);

router.put(
  "/:id",

  handleError(async (req: Request, res: Response) => {
    const servicio = await servicioConstruccionService.ActualizarTodosLosCampos(
      Number(req.params.id),
      req.body
    );
    res.json(servicio);
  })
);

router.delete(
  "/:id",

  handleError(async (req: Request, res: Response) => {
    await servicioConstruccionService.DesactivarUno(Number(req.params.id));
    res.json({ message: "ServicioConstruccion desactivado con éxito" });
  })
);

export default router;
