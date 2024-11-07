import { Router, Request, Response } from "express";
import TransporteService from "../service/TransporteService";
import TransporteRepo from "../persistence/TransporteRepo";
import { handleError } from "../infrastructure/middlewares/handler-error";
import { authenticate } from "../infrastructure/middlewares/auth";

const transporteRepo = new TransporteRepo();
const transporteService = new TransporteService(transporteRepo);
const router = Router();

router.get(
  "/",
  handleError(async (req: Request, res: Response) => {
    const transportes = await transporteService.ObtenerTodos();
    res.json(transportes);
  })
);

router.get(
  "/:id",
  handleError(async (req: Request, res: Response) => {
    const transporte = await transporteService.ObtenerUno(
      Number(req.params.id)
    );
    res.json(transporte);
  })
);

router.post(
  "/",
  handleError(async (req: Request, res: Response) => {
    const transporte = await transporteService.CrearUno(req.body);
    res.json(transporte);
  })
);

router.put(
  "/:id",

  handleError(async (req: Request, res: Response) => {
    const transporte = await transporteService.ActualizarTodosLosCampos(
      Number(req.params.id),
      req.body
    );
    res.json(transporte);
  })
);

router.delete(
  "/:id",
  handleError(async (req: Request, res: Response) => {
    await transporteService.DesactivarUno(Number(req.params.id));
    res.json({ message: "Transporte desactivado con éxito" });
  })
);

export default router;
