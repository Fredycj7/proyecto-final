import { Router, Request, Response } from "express";
import EmpleadoService from "../service/EmpleadoService";
import EmpleadoRepo from "../persistence/EmpleadoRepo";
import { handleError } from "../infrastructure/middlewares/handler-error";
import { authenticate } from "../infrastructure/middlewares/auth";

const empleadoRepo = new EmpleadoRepo();
const empleadoService = new EmpleadoService(empleadoRepo);
const router = Router();

router.get(
  "/",

  handleError(async (req: Request, res: Response) => {
    const empleados = await empleadoService.ObtenerTodos();
    res.json(empleados);
  })
);

router.get(
  "/:id",

  handleError(async (req: Request, res: Response) => {
    const empleado = await empleadoService.ObtenerUno(Number(req.params.id));
    res.json(empleado);
  })
);

router.post(
  "/",
  handleError(async (req: Request, res: Response) => {
    const empleado = await empleadoService.CrearUno(req.body);
    res.json(empleado);
  })
);

router.put(
  "/:id",

  handleError(async (req: Request, res: Response) => {
    const empleado = await empleadoService.ActualizarTodosLosCampos(
      Number(req.params.id),
      req.body
    );
    res.json(empleado);
  })
);

router.delete(
  "/:id",

  handleError(async (req: Request, res: Response) => {
    await empleadoService.DesactivarUno(Number(req.params.id));
    res.json({ message: "Empleado desactivado con éxito" });
  })
);

export default router;
