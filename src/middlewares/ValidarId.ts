import type { NextFunction, Request, Response } from "express";

export function validarIdParam(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const id = parseInt(String(req.params.id));

  if (isNaN(id)) {
    res.status(400).json({ error: "ID informado é inválido." });
    return;
  }

  next();
}
