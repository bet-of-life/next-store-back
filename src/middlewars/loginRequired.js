import jwt from "jsonwebtoken";
import { prismaClient } from "../database/prismaCliente.js";
export default async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({
      errors: ["Login Required"],
    });
  }

  const [, token] = authorization.split(" ");

  try {
    const dados = jwt.verify(token, process.env.TOKEN_SECRET);
    const { id, email } = dados;
    const user = await prismaClient.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(401).json({
        errors: ["Usuário inválido!!"],
      });
    }

    req.userId = id;
    req.userEmail = email;

    return next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({
      errors: ["Token expirado ou inválido!"],
    });
  }
};
