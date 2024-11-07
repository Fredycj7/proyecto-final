import { Router, Request, Response } from "express";
import GastoService from "../service/GastoService";
import GastoRepo from "../persistence/GastoRepo";
import { handleError } from "../infrastructure/middlewares/handler-error";
import { authenticate } from "../infrastructure/middlewares/auth";

const gastoRepo = new GastoRepo();
const gastoService = new GastoService(gastoRepo);
const router = Router();

router.get(
  "/",

  handleError(async (req: Request, res: Response) => {
    const gastos = await gastoService.ObtenerTodos();
    res.json(gastos);
  })
);

router.get(
  "/:id",

  handleError(async (req: Request, res: Response) => {
    const gasto = await gastoService.ObtenerUno(Number(req.params.id));
    res.json(gasto);
  })
);

router.post(
  "/",
  handleError(async (req: Request, res: Response) => {
    const gasto = await gastoService.CrearUno(req.body);
    res.json(gasto);
  })
);

router.put(
  "/:id",

  handleError(async (req: Request, res: Response) => {
    const gasto = await gastoService.ActualizarTodosLosCampos(
      Number(req.params.id),
      req.body
    );
    res.json(gasto);
  })
);

router.delete(
  "/:id",

  handleError(async (req: Request, res: Response) => {
    await gastoService.DesactivarUno(Number(req.params.id));
    res.json({ message: "Gasto desactivado con éxito" });
  })
);

export default router;
