import { Router, Request, Response } from "express";
import SedeService from "../service/SedeService";
import SedeRepo from "../persistence/SedeRepo";
import { handleError } from "../infrastructure/middlewares/handler-error";
import { authenticate } from "../infrastructure/middlewares/auth";

const sedeRepo = new SedeRepo();
const sedeService = new SedeService(sedeRepo);
const router = Router();

router.get(
  "/",

  handleError(async (req: Request, res: Response) => {
    const sedes = await sedeService.ObtenerTodos();
    res.json(sedes);
  })
);

router.get(
  "/:id",

  handleError(async (req: Request, res: Response) => {
    const sede = await sedeService.ObtenerUno(Number(req.params.id));
    res.json(sede);
  })
);

router.post(
  "/",
  handleError(async (req: Request, res: Response) => {
    const sede = await sedeService.CrearUno(req.body);
    res.json(sede);
  })
);

router.put(
  "/:id",

  handleError(async (req: Request, res: Response) => {
    const sede = await sedeService.ActualizarTodosLosCampos(
      Number(req.params.id),
      req.body
    );
    res.json(sede);
  })
);

router.delete(
  "/:id",

  handleError(async (req: Request, res: Response) => {
    await sedeService.DesactivarUno(Number(req.params.id));
    res.json({ message: "Sede desactivada con éxito" });
  })
);

export default router;
