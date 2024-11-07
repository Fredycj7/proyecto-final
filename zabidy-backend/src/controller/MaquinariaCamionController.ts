import { Router, Request, Response } from "express";
import MaquinariaCamionService from "../service/MaquinariaCamionService";
import MaquinariaCamionRepo from "../persistence/MaquinariaCamionRepo";
import { handleError } from "../infrastructure/middlewares/handler-error";
import { authenticate } from "../infrastructure/middlewares/auth";

const maquinariaCamionRepo = new MaquinariaCamionRepo();
const maquinariaCamionService = new MaquinariaCamionService(
  maquinariaCamionRepo
);
const router = Router();

router.get(
  "/",

  handleError(async (req: Request, res: Response) => {
    const maquinarias = await maquinariaCamionService.ObtenerTodos();
    res.json(maquinarias);
  })
);

router.get(
  "/:id",

  handleError(async (req: Request, res: Response) => {
    const maquinaria = await maquinariaCamionService.ObtenerUno(
      Number(req.params.id)
    );
    res.json(maquinaria);
  })
);

router.post(
  "/",
  handleError(async (req: Request, res: Response) => {
    const maquinaria = await maquinariaCamionService.CrearUno(req.body);
    res.json(maquinaria);
  })
);

router.put(
  "/:id",

  handleError(async (req: Request, res: Response) => {
    const maquinaria = await maquinariaCamionService.ActualizarTodosLosCampos(
      Number(req.params.id),
      req.body
    );
    res.json(maquinaria);
  })
);

router.delete(
  "/:id",

  handleError(async (req: Request, res: Response) => {
    await maquinariaCamionService.DesactivarUno(Number(req.params.id));
    res.json({ message: "MaquinariaCamion desactivada con éxito" });
  })
);

export default router;
