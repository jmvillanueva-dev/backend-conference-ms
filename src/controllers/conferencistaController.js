import { PrismaClient } from "../generated/prisma/client.js";

const prisma = new PrismaClient();

export const getConferencistas = async (req, res) => {
  try {
    const conferencistas = await prisma.conferencista.findMany();
    res.status(200).json(conferencistas);
  } catch (err) {
    res.status(500).json({
      message: "Error al obtener los conferencistas",
      error: err.message,
    });
  }
};

export const getConferencistaById = async (req, res) => {
  try {
    const { id } = req.params;
    const conferencista = await prisma.conferencista.findUnique({
      where: { id: parseInt(id) },
    });

    if (!conferencista) {
      return res.status(404).json({ message: "Conferencista no encontrado" });
    }
    res.status(200).json(conferencista);
  } catch (err) {
    res.status(500).json({
      message: "Error al obtener el conferencista",
      error: err.message,
    });
  }
};


export const createConferencista = async (req, res) => {
  try {
    const {
      nombre,
      apellido,
      cedula,
      genero,
      ciudad,
      direccion,
      fechaNacimiento,
      telefono,
      email,
      empresa,
    } = req.body;
    const nuevoConferencista = await prisma.conferencista.create({
      data: {
        nombre,
        apellido,
        cedula,
        genero,
        ciudad,
        direccion,
        fechaNacimiento,
        telefono,
        email,
        empresa,
      },
    });
    res.status(201).json(nuevoConferencista);
  } catch (err) {
    res.status(500).json({
      message: "Error al crear el conferencista",
      error: err.message,
    });
  }
};


export const updateConferencista = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      nombre,
      apellido,
      cedula,
      genero,
      ciudad,
      direccion,
      fechaNacimiento,
      telefono,
      email,
      empresa,
    } = req.body;
    const conferencistaActualizado = await prisma.conferencista.update({
      where: { id: parseInt(id) },
      data: {
        nombre,
        apellido,
        cedula,
        genero,
        ciudad,
        direccion,
        fechaNacimiento,
        telefono,
        email,
        empresa,
      },
    });
    res.status(200).json(conferencistaActualizado);
  } catch (err) {
    res.status(500).json({
      message: "Error al actualizar el conferencista",
      error: err.message,
    });
  }
};


export const deleteConferencista = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.conferencista.delete({
      where: { id: parseInt(id) },
    });
    res.status(200).json({ message: "Conferencista eliminado exitosamente" });
  } catch (err) {
    if (err.code === "P2003") {
      res.status(409).json({
        message:
          "Lo sentimos, no se puede eliminar este conferencista porque está asociado a una o más reservas.",
      });
    } else {
      res.status(500).json({
        message: "Error al eliminar el conferencista",
        error: err.message,
      });
    }
  }
};
