import { Router, Request, Response } from "express";
import GiroNegocioService from "../service/GiroNegocioService";
import GiroNegocioRepo from "../persistence/GiroNegocioRepo";
import { handleError } from "../infrastructure/middlewares/handler-error";
import { authenticate } from "../infrastructure/middlewares/auth";

const giroNegocioRepo = new GiroNegocioRepo();
const giroNegocioService = new GiroNegocioService(giroNegocioRepo);
const router = Router();

router.get(
  "/",

  handleError(async (req: Request, res: Response) => {
    const giros = await giroNegocioService.ObtenerTodos();
    res.json(giros);
  })
);

router.get(
  "/:id",

  handleError(async (req: Request, res: Response) => {
    const giro = await giroNegocioService.ObtenerUno(Number(req.params.id));
    res.json(giro);
  })
);

router.post(
  "/",
  handleError(async (req: Request, res: Response) => {
    const giro = await giroNegocioService.CrearUno(req.body);
    res.json(giro);
  })
);

router.put(
  "/:id",

  handleError(async (req: Request, res: Response) => {
    const giro = await giroNegocioService.ActualizarTodosLosCampos(
      Number(req.params.id),
      req.body
    );
    res.json(giro);
  })
);

router.delete(
  "/:id",

  handleError(async (req: Request, res: Response) => {
    await giroNegocioService.DesactivarUno(Number(req.params.id));
    res.json({ message: "Giro de negocio desactivado con éxito" });
  })
);

export default router;
