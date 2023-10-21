import { prismaClient } from "../database/prismaCliente.js";

export class CommentController {
  async createComment(req, res) {
    try {
      const { content, userId, postId } = req.body;
      if (!content || !userId || !postId) {
        return res.status(401).json({
          message: ["Por favor, verifique os dados e tente novamente."],
        });
      }

      const comment = await prismaClient.comment.create({
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
          post: {
            select: {
              id: true,
            },
          },
          created_at: true,
          update_at: true,
        },
        data: {
          content,
          userId,
          postId,
        },
      });
      return res
        .status(201)
        .json({ message: `Comentário publicado com sucesso!`, comment });
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }
  }

  async findComment(req, res) {
    try {
      const { id } = req.params;
      const comment = await prismaClient.comment.findUnique({
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
          post: {
            select: {
              id: true,
            },
          },
        },
      });
      if (!comment) {
        return res.status(404).json({ message: "Comentário não encontrado!" });
      }

      return res.status(200).json(comment);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

  async updateComment(req, res) {
    try {
      const { id } = req.params;
      const { postId, userId, content } = req.body;

      if (!userId || !postId || !content) {
        return res.status(401).json({
          message: ["Por favor, verifique os dados e tente novamente!"],
        });
      }

      let comment = prismaClient.comment.findUnique({
        where: {
          id: Number(id),
        },
      });

      if (!comment) {
        return res.status(404).json({ message: "Comentário não encontrado!" });
      }

      comment = await prismaClient.comment.update({
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
          post: {
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
          postId,
        },
      });
      return res
        .status(200)
        .json({ message: `Comentário atualizada com sucesso!`, comment });
    } catch (err) {
      return res
        .status(500)
        .json({ message: `Id deste comentário está invalido!` });
    }
  }

  async findAllComments(req, res) {
    try {
      const comments = await prismaClient.comment.findMany({
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
          post: {
            select: {
              id: true,
            },
          },
          created_at: true,
        },
      });
      return res.status(200).json(comments);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

  async deleteComment(req, res) {
    try {
      const { id } = req.params;
      const comment = await prismaClient.comment.findUnique({
        where: {
          id: Number(id),
        },
      });
      if (!comment) {
        return res.status(404).json({ message: "Comentário não encontrado!" });
      }

      await prismaClient.comment.delete({
        where: {
          id: Number(id),
        },
      });
      return res
        .status(200)
        .json({ message: "Comentário deletado com sucesso!" });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }
}
