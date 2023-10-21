import { prismaClient } from "../database/prismaCliente.js";
import bcryptjs from "bcryptjs";

export class PostController {
  async createPost(req, res) {
    try {
      const { content, userId } = req.body;
      if (!content || !userId) {
        return res.status(401).json({
          message: ["Por favor, verifique os dados e tente novamente."],
        });
      }

      const post = await prismaClient.post.create({
        select: {
          id: true,
          content: true,
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              profession: true,
            },
          },
          created_at: true,
          update_at: true,
        },
        data: {
          content,
          userId,
        },
      });
      return res
        .status(201)
        .json({ message: `Publicação publicada com sucesso!`, post });
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }
  }

  async findPost(req, res) {
    try {
      const { id } = req.params;
      const post = await prismaClient.post.findUnique({
        where: {
          id: Number(id),
        },
        select: {
          id: true,
          content: true,
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              profession: true,
            },
          },
          comment: {
            select: {
              id: true,
              content: true,
              created_at: true,
            },
          },
        },
      });
      if (!post) {
        return res.status(404).json({ message: "Publicação não encontrada!" });
      }

      return res.status(200).json(post);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

  async findAllPosts(req, res) {
    try {
      const posts = await prismaClient.post.findMany({
        select: {
          id: true,
          content: true,
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              profession: true,
            },
          },
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
          created_at: true,
        },
      });
      return res.status(200).json(posts);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

  async updatePost(req, res) {
    try {
      const { id } = req.params;
      const { userId, content } = req.body;

      if (!userId || !content) {
        return res.status(401).json({
          message: ["Por favor, verifique os dados e tente novamente!"],
        });
      }

      let post = prismaClient.post.findUnique({
        where: {
          id: Number(id),
        },
      });

      if (!post) {
        return res.status(404).json({ message: "Post não encontrado!" });
      }

      post = await prismaClient.post.update({
        where: {
          id: Number(id),
        },
        select: {
          id: true,
          content: true,
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              profession: true,
            },
          },
          comment: {
            select: {
              id: true,
              content: true,
              created_at: true,
            },
          },
        },
        data: {
          content,
          userId,
        },
      });
      return res
        .status(200)
        .json({ message: `Publicação atualizada com sucesso!`, post });
    } catch (err) {
      return res
        .status(500)
        .json({ message: `Id desta publicação está invalido!` });
    }
  }

  async deletePost(req, res) {
    try {
      const { id } = req.params;
      const post = await prismaClient.post.findUnique({
        where: {
          id: Number(id),
        },
      });
      if (!post) {
        return res.status(404).json({ message: "Publicação não encontrada!" });
      }

      await prismaClient.post.delete({
        where: {
          id: Number(id),
        },
      });
      return res
        .status(200)
        .json({ message: "Publicação deletada com sucesso!" });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }
}
