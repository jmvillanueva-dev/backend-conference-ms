import { PrismaClient } from "../generated/prisma/client.js";

const prisma = new PrismaClient();

export const getReservas = async (req, res) => {
  try {
    const reservas = await prisma.reserva.findMany({
      include: {
        conferencista: true,
        auditorio: true,
      },
    });
    res.status(200).json(reservas);
  } catch (err) {
    res.status(500).json({
      message: "Error al obtener las reservas",
      error: err.message,
    });
  }
};


export const getReservaById = async (req, res) => {
  try {
    const { id } = req.params;
    const reserva = await prisma.reserva.findUnique({
      where: { id: parseInt(id) },
      include: {
        conferencista: true,
        auditorio: true,
      },
    });

    if (!reserva) {
      return res.status(404).json({ message: "Reserva no encontrada" });
    }
    res.status(200).json(reserva);
  } catch (err) {
    res.status(500).json({
      message: "Error al obtener la reserva",
      error: err.message,
    });
  }
};

export const createReserva = async (req, res) => {
  try {
    const { codigo, descripcion, conferencistaId, auditorioId } = req.body;
    const nuevaReserva = await prisma.reserva.create({
      data: {
        codigo,
        descripcion,
        conferencistaId,
        auditorioId,
      },
    });
    res.status(201).json(nuevaReserva);
  } catch (err) {
    res.status(500).json({
      message: "Error al crear la reserva",
      error: err.message,
    });
  }
};

export const updateReserva = async (req, res) => {
  try {
    const { id } = req.params;
    const { codigo, descripcion, conferencistaId, auditorioId } = req.body;
    const reservaActualizada = await prisma.reserva.update({
      where: { id: parseInt(id) },
      data: {
        codigo,
        descripcion,
        conferencistaId,
        auditorioId,
      },
    });
    res.status(200).json(reservaActualizada);
  } catch (err) {
    res.status(500).json({
      message: "Error al actualizar la reserva",
      error: err.message,
    });
  }
};


export const deleteReserva = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.reserva.delete({
      where: { id: parseInt(id) },
    });
    res.status(200).json({ message: "Reserva eliminada exitosamente" });
  } catch (err) {
    res.status(500).json({
      message: "Error al eliminar la reserva",
      error: err.message,
    });
  }
};
