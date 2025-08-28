import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.js";
import {
  registerUser,
  loginUser,
  confirmUser,
} from "../controllers/userController.js";
import {
  getConferencistas,
  getConferencistaById,
  createConferencista,
  updateConferencista,
  deleteConferencista,
} from "../controllers/conferencistaController.js";
import {
  getAuditorios,
  getAuditorioById,
  createAuditorio,
  updateAuditorio,
  deleteAuditorio,
} from "../controllers/auditorioController.js";
import {
  getReservas,
  getReservaById,
  createReserva,
  updateReserva,
  deleteReserva,
} from "../controllers/reservaController.js";

const router = Router();

// Rutas públicas (no requieren autenticación)
router.post("/users/register", registerUser);
router.post("/users/login", loginUser);
router.get("/users/confirm/:token", confirmUser);

// Rutas protegidas (requieren autenticación)
router.use(authMiddleware);

// Rutas para Conferencistas
router.get("/conferencistas", getConferencistas);
router.get("/conferencistas/:id", getConferencistaById);
router.post("/conferencistas", createConferencista);
router.put("/conferencistas/:id", updateConferencista);
router.delete("/conferencistas/:id", deleteConferencista);

// Rutas para Auditorios
router.get("/auditorios", getAuditorios);
router.get("/auditorios/:id", getAuditorioById);
router.post("/auditorios", createAuditorio);
router.put("/auditorios/:id", updateAuditorio);
router.delete("/auditorios/:id", deleteAuditorio);

// Rutas para Reservas
router.get("/reservas", getReservas);
router.get("/reservas/:id", getReservaById);
router.post("/reservas", createReserva);
router.put("/reservas/:id", updateReserva);
router.delete("/reservas/:id", deleteReserva);

export default router;
