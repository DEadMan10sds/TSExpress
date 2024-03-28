import { Request, Response, NextFunction } from "express";

import { validationResult } from "express-validator";

export const validateFields = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const bodyErrors = validationResult(req);

  if (!bodyErrors.isEmpty()) return res.status(400).json(bodyErrors);

  next();
};
