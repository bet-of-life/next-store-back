import { prismaClient } from "../database/prismaCliente.js";
import bcryptjs from "bcryptjs";

export class UsersController {
  async createUser(req, res) {
    try {
      const { name, profession, email, password, permission } = req.body;
      if (!name || !profession || !email || !password) {
        return res.status(401).json({
          message: ["Por favor, verifique os dados e tente novamente!"],
        });
      }
      let user = await prismaClient.user.findUnique({
        where: {
          email,
        },
      });
      if (user) {
        return res.json({ message: "Usuário já cadastrado" });
      }

      user = await prismaClient.user.create({
        select: {
          id: true,
          name: true,
          profession: true,
          email: true,
          permission: true,
          created_at: true,
          update_at: true,
        },
        data: {
          name,
          profession,
          email,
          permission,
          password_hash: await bcryptjs.hash(password, 8),
        },
      });
      return res
        .status(201)
        .json({ message: `Usuário cadastrado com sucesso!`, user });
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }
  }

  async findUser(req, res) {
    try {
      const { id } = req.params;
      const user = await prismaClient.user.findUnique({
        where: {
          id: Number(id),
        },
        select: {
          id: true,
          name: true,
          profession: true,
          email: true,

          permission: true,
          created_at: true,
          update_at: true,
          post: {
            select: {
              id: true,
              comment: {
                select: {
                  id: true,
                  content: true,
                  created_at: true,
                  user: {
                    select: {
                      name: true,
                      id: true,
                    },
                  },
                },
              },
              content: true,
              created_at: true,
              user: {
                select: {
                  id: true,
                  profession: true,
                  name: true,
                  created_at: true,
                },
              },
            },
          },
        },
      });
      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado!" });
      }

      return res.status(200).json(user);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

  async findAllUsers(req, res) {
    try {
      const users = await prismaClient.user.findMany({
        select: {
          id: true,
          name: true,
          profession: true,
          email: true,
          permission: true,
          post: {
            select: {
              id: true,
              comment: {
                select: {
                  id: true,
                  content: true,
                  created_at: true,
                  user: {
                    select: {
                      name: true,
                      id: true,
                    },
                  },
                },
              },
              content: true,
              created_at: true,
              user: {
                select: {
                  id: true,
                  profession: true,
                  name: true,
                  created_at: true,
                },
              },
            },
          },
          created_at: true,
          update_at: true,
        },
      });
      return res.status(200).json(users);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

  async updateUser(req, res) {
    try {
      const { id } = req.params;
      const { name, profession, email, password, permission } = req.body;

      if (!name || !profession || !email) {
        return res.status(401).json({
          message: "Por favor, verifique os dados e tente novamente",
        });
      }

      let user = prismaClient.user.findUnique({
        where: {
          id: Number(id),
        },
      });

      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado!" });
      }

      user = await prismaClient.user.update({
        where: {
          id: Number(id),
        },
        select: {
          id: true,
          name: true,
          profession: true,
          email: true,
          permission: true,
          created_at: true,
          update_at: true,
        },
        data: {
          name,
          profession,
          email,
          permission,
          password_hash: password
            ? await bcryptjs.hash(password, 8)
            : (
                await user
              ).password_hash,
        },
      });
      return res
        .status(200)
        .json({ message: `Usuário atualizado com sucesso!`, user });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

  async deleteUser(req, res) {
    try {
      const { id } = req.params;
      const user = await prismaClient.user.findUnique({
        where: {
          id: Number(id),
        },
      });
      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado!" });
      }

      await prismaClient.user.delete({
        where: {
          id: Number(id),
        },
      });
      return res.status(200).json({ message: "Usuário deletado com sucesso!" });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }
}
