import { PrismaClient } from "../generated/prisma/client.js";

const prisma = new PrismaClient();

export const getAuditorios = async (req, res) => {
  try {
    const auditorios = await prisma.auditorio.findMany();
    res.status(200).json(auditorios);
  } catch (err) {
    res.status(500).json({
      message: "Error al obtener los auditorios",
      error: err.message,
    });
  }
};


export const getAuditorioById = async (req, res) => {
  try {
    const { id } = req.params;
    const auditorio = await prisma.auditorio.findUnique({
      where: { id: parseInt(id) },
    });

    if (!auditorio) {
      return res.status(404).json({ message: "Auditorio no encontrado" });
    }
    res.status(200).json(auditorio);
  } catch (err) {
    res.status(500).json({
      message: "Error al obtener el auditorio",
      error: err.message,
    });
  }
};

export const createAuditorio = async (req, res) => {
  try {
    const { codigo, nombre, ubicacion, capacidad, descripcion } = req.body;
    const nuevoAuditorio = await prisma.auditorio.create({
      data: {
        codigo,
        nombre,
        ubicacion,
        capacidad,
        descripcion,
      },
    });
    res.status(201).json(nuevoAuditorio);
  } catch (err) {
    res.status(500).json({
      message: "Error al crear el auditorio",
      error: err.message,
    });
  }
};

export const updateAuditorio = async (req, res) => {
  try {
    const { id } = req.params;
    const { codigo, nombre, ubicacion, capacidad, descripcion } = req.body;
    const auditorioActualizado = await prisma.auditorio.update({
      where: { id: parseInt(id) },
      data: {
        codigo,
        nombre,
        ubicacion,
        capacidad,
        descripcion,
      },
    });
    res.status(200).json(auditorioActualizado);
  } catch (err) {
    res.status(500).json({
      message: "Error al actualizar el auditorio",
      error: err.message,
    });
  }
};

export const deleteAuditorio = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.auditorio.delete({
      where: { id: parseInt(id) },
    });
    res.status(200).json({ message: "Auditorio eliminado exitosamente" });
  } catch (err) {
    if (err.code === "P2003") {
      res.status(409).json({
        message:
          "Lo sentimos, no se puede eliminar este auditorio porque está asociado a una o más reservas.",
      });
    } else {
      res.status(500).json({
        message: "Error al eliminar el auditorio",
        error: err.message,
      });
    }
  }
};
