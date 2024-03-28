import { Request, Response } from "express";
import { collections } from "../database/database";

const getArticles = async (req: Request, res: Response) => {
  try {
    const data = await collections.articles.find().toArray();

    if (!data.length || !data) throw new Error("No existen datos");

    return res.status(200).json({
      message: "Datos encontrados",
      data,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Error al buscar los datos",
      error,
    });
  }
};

export const articleController = {
  getArticles,
};
