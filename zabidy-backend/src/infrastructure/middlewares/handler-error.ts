import { Request, Response, NextFunction } from "express";
import { BusinessException } from "../errors";
import { StatusCodes } from "../status-codes";
export function handleError(
  fn: (req: Request, res: Response, next: NextFunction) => Promise<void>
) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      if (error instanceof BusinessException) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        console.log(error);

        res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ message: "Error interno del servidor" });
      }
    }
  };
}
