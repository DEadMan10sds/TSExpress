import { Request, Response } from "express";
import { collections } from "../database/database";
import { filterAttributes } from "../helpers/filterAttributes";
import { ObjectId } from "mongodb";
import { defaultQuery } from "../constants/defaultQuery";

const getArticles = async (req: Request, res: Response) => {
  let { limit = 5, start = 0, active, ...filters }: any = req.query,
    id;
  id = req.params.id !== undefined ? new ObjectId(req.params.id) : null;

  const { filteredAttributes, filteredQuery } = filterAttributes(filters);

  if (active !== undefined) defaultQuery.active = active;

  try {
    let data;

    data = !id
      ? await collections.articles
          .find({ ...defaultQuery, ...filteredQuery })
          .skip(Number(start))
          .limit(Number(limit))
          .sort(filteredAttributes)
          .toArray()
      : await collections.articles.findOne({ _id: id });

    if (!data || (Array.isArray(data) && data?.length === 0)) {
      return res.status(200).json({
        message: "No existen los datos buscados",
      });
    }

    return res.status(200).json({
      message: "Datos encontrados",
      data,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Error en la consulta",
      error,
    });
  }
};

const createArticle = async (req: Request, res: Response) => {
  const data = req.body;

  try {
    const newArticle = await collections.articles.insertOne(data);

    if (!newArticle)
      return res.status(400).json({
        message: "No se logró registrar el artículo",
      });

    return res.status(200).json({
      message: "Artículo creado correctamente",
      data: newArticle,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Error al guardar en la base de datos",
      error,
    });
  }
};

const updateArticle = async (req: Request, res: Response) => {
  const id = new ObjectId(req.params.id);
  const data = req.body;

  try {
    const updatedArticle = await collections.articles.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          ...data,
        },
      },
      { upsert: true }
    );

    if (!updatedArticle)
      return res.status(400).json({
        message: "No se logró actualizar el artículo",
      });

    return res.status(200).json({
      message: "Artículo actualizado",
      data: updatedArticle,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Error al actualizar el artículo",
      error,
    });
  }
};

export const softDeleteArticle = async (req: Request, res: Response) => {
  const id = new ObjectId(req.params.id);
  try {
    const softDeletedArticle = await collections.articles.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          active: false,
        },
      },
      {
        upsert: true,
      }
    );
    if (!softDeletedArticle)
      return res.status(400).json({
        message: "No se logró desactivar el artículo",
      });

    return res.status(200).json({
      message: "Artículo desactivado",
      data: softDeletedArticle,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Error al desactivar el artículo",
      error,
    });
  }
};

export const deleteArticle = async (req: Request, res: Response) => {
  const id = new ObjectId(req.params.id);
  try {
    const deletedArticle = await collections.articles.findOneAndDelete({
      _id: id,
    });

    if (!deletedArticle)
      return res.status(400).json({
        message: "No se logró eliminar el artículo",
        data: deletedArticle,
      });

    return res.status(200).json({
      message: "Artículo eliminado correctamente",
      data: deletedArticle,
    });
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      message: "Error al eliminar el artículo",
      error,
    });
  }
};

export const articleController = {
  getArticles,
  createArticle,
  updateArticle,
  softDeleteArticle,
  deleteArticle,
};
