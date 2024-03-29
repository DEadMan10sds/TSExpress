import { Request, Response } from "express";
import { collections } from "../database/database";

const getArticles = async (req: Request, res: Response) => {
  let { limit = 5, start = 0, active, ...filters }: any = req.query,
    id;
  id = req.params.id !== undefined ? new ObjectId(req.params.id) : null;

  const { filteredAttributes, filteredQuery } = filterAttributes(filters);

  if (active !== undefined) defaultQuery.active = active;

  try {
    let data;

    data = !id
      ? await collections.users
          .find({ ...defaultQuery, ...filteredQuery })
          .skip(Number(start))
          .limit(Number(limit))
          .sort(filteredAttributes)
          .toArray()
      : await collections.users.findOne({ _id: id });

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
    return res.status(400).json({
      message: "Error en la consulta",
      error,
    });
  }
};
