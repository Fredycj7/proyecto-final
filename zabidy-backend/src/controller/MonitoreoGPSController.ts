import { Router, Request, Response } from "express";
import MonitoreoGPSService from "../service/MonitoreoGPSService";
import MonitoreoGPSRepo from "../persistence/MonitoreoGPSRepo";
import { handleError } from "../infrastructure/middlewares/handler-error";
import { authenticate } from "../infrastructure/middlewares/auth";

const monitoreoGPSRepo = new MonitoreoGPSRepo();
const monitoreoGPSService = new MonitoreoGPSService(monitoreoGPSRepo);
const router = Router();

router.get(
  "/",

  handleError(async (req: Request, res: Response) => {
    const monitoreos = await monitoreoGPSService.ObtenerTodos();
    res.json(monitoreos);
  })
);

router.get(
  "/:id",

  handleError(async (req: Request, res: Response) => {
    const monitoreo = await monitoreoGPSService.ObtenerUno(
      Number(req.params.id)
    );
    res.json(monitoreo);
  })
);

router.post(
  "/",
  handleError(async (req: Request, res: Response) => {
    const monitoreo = await monitoreoGPSService.CrearUno(req.body);
    res.json(monitoreo);
  })
);

router.put(
  "/:id",

  handleError(async (req: Request, res: Response) => {
    const monitoreo = await monitoreoGPSService.ActualizarTodosLosCampos(
      Number(req.params.id),
      req.body
    );
    res.json(monitoreo);
  })
);

router.delete(
  "/:id",

  handleError(async (req: Request, res: Response) => {
    await monitoreoGPSService.DesactivarUno(Number(req.params.id));
    res.json({ message: "MonitoreoGPS desactivado con éxito" });
  })
);

export default router;
