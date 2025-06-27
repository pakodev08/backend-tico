import { response } from "express";
import { validationResult } from "express-validator";

const validarCampos = (req, res = response, next) => {
  //TODO MANEJO DE ERRORES
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({
      ok: false,
      errors: errors.mapped(),
    });
  }

  next();
};

export { validarCampos };
