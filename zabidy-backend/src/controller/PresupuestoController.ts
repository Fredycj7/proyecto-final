import { Router, Request, Response } from "express";
import PresupuestoService from "../service/PresupuestoService";
import PresupuestoRepo from "../persistence/PresupuestoRepo";
import { handleError } from "../infrastructure/middlewares/handler-error";
import { authenticate } from "../infrastructure/middlewares/auth";

const presupuestoRepo = new PresupuestoRepo();
const presupuestoService = new PresupuestoService(presupuestoRepo);
const router = Router();

router.get(
  "/",

  handleError(async (req: Request, res: Response) => {
    const presupuestos = await presupuestoService.ObtenerTodos();
    res.json(presupuestos);
  })
);

router.get(
  "/:id",

  handleError(async (req: Request, res: Response) => {
    const presupuesto = await presupuestoService.ObtenerUno(
      Number(req.params.id)
    );
    res.json(presupuesto);
  })
);

router.post(
  "/",
  handleError(async (req: Request, res: Response) => {
    const presupuesto = await presupuestoService.CrearUno(req.body);
    res.json(presupuesto);
  })
);

router.put(
  "/:id",

  handleError(async (req: Request, res: Response) => {
    const presupuesto = await presupuestoService.ActualizarTodosLosCampos(
      Number(req.params.id),
      req.body
    );
    res.json(presupuesto);
  })
);

router.delete(
  "/:id",

  handleError(async (req: Request, res: Response) => {
    await presupuestoService.DesactivarUno(Number(req.params.id));
    res.json({ message: "Presupuesto desactivado con éxito" });
  })
);

export default router;
