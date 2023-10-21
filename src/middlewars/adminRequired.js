import { prismaClient } from "../database/prismaCliente.js";
import jwt from "jsonwebtoken";

export default async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({
      errors: ["Access denied, permission for administrators only!"],
    });
  }
  const [, token] = authorization.split(" ");

  try {
    const dados = jwt.verify(token, process.env.TOKEN_SECRET);
    const { permission } = dados;

    if (!permission) {
      return res.status(401).json({
        errors: ["Acesso apenas para administradores"],
      });
    }

    return next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({
      errors: ["Token expirado ou inválido!"],
    });
  }
};
