import { prismaClient } from "../database/prismaCliente.js";
import bcryptjs from "bcryptjs";


export class ShirtsController {
    async createShirts(req, res) {
        try {
          const {  src, srcHover, name, price, oldPrice } = req.body;
          if ( !src || !srcHover || !name || !price || !oldPrice) {
            return res.status(401).json({
              message: ["Por favor, verifique os dados e tente novamente!"],
            });
          }
          let shirts = await prismaClient.shirts.findUnique({
            where: {
              email,
            },
          });
          if (shirts) {
            return res.json({ message: "Camisa já cadastrada" });
          }
    
          shirts = await prismaClient.shirts.create({
            select: {
              id: true,
              src: true,
              srcHover: true,
              name: true,
              price: true, 
              oldPrice: true,
              created_at: true,
              update_at: true,
            },
            data: {
              name,
              src,
              srcHover,
              name,
              price,
              oldPrice
            },
          });
          return res
            .status(201)
            .json({ message: `Camisa cadastrada com sucesso!`, shirts });
        } catch (err) {
          return res.status(400).json({ message: err.message });
        }
      }

      async findShirt(req, res) {
        try {
          const { id } = req.params;
          const shirt = await prismaClient.shirts.findUnique({
            where: {
              id: Number(id),
            },
            select: {
                id: true,
                src: true,
                srcHover: true,
                name: true,
                price: true, 
                oldPrice: true,
                created_at: true,
                update_at: true,
              },
          });
          if (!shirt) {
            return res.status(404).json({ message: "Camisa não encontrada!" });
          }
    
          return res.status(200).json(shirt);
        } catch (err) {
          return res.status(500).json({ message: err.message });
        }
      }

      async findAllShirts(req, res) {
        try {
          const shirts = await prismaClient.shirts.findMany({
            select: {
                id: true,
                src: true,
                srcHover: true,
                name: true,
                price: true, 
                oldPrice: true,
                created_at: true,
                update_at: true,
              },
          });
          return res.status(200).json(shirts);
        } catch (err) {
          return res.status(500).json({ message: err.message });
        }
    }

    async updateShirt(req, res) {
        try {
          const { id } = req.params;
          const { src, srcHover, name, price, oldPrice } = req.body;
    
          let shirt = prismaClient.shirts.findUnique({
            where: {
              id: Number(id),
            },
          });
    
          if (!shirt) {
            return res.status(404).json({ message: "Camisa não encontrada!" });
          }
    
          shirt = await prismaClient.shirts.update({
            where: {
              id: Number(id),
            },
            select: {
                id: true,
                src: true,
                srcHover: true,
                name: true,
                price: true, 
                oldPrice: true,
                created_at: true,
                update_at: true,
              },
              data: {
                name,
                src,
                srcHover,
                name,
                price,
                oldPrice
              },
          });
          return res
            .status(200)
            .json({ message: `Camisa atualizada com sucesso!`, shirt });
        } catch (err) {
          return res.status(500).json({ message: err.message });
        }
      }

      async deleteShirt(req, res) {
        try {
          const { id } = req.params;
          const shirt = await prismaClient.shirts.findUnique({
            where: {
              id: Number(id),
            },
          });
          if (!shirt) {
            return res.status(404).json({ message: "Camisa não encontrada!" });
          }
    
          await prismaClient.shirts.delete({
            where: {
              id: Number(id),
            },
          });
          return res.status(200).json({ message: "Camisa deletada com sucesso!" });
        } catch (err) {
          return res.status(500).json({ message: err.message });
        }
      }
}


