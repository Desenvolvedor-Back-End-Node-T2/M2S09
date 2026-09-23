import { Router } from 'express'
import { ConsultaController } from '../controllers/ConsultaController'
import { authMiddleware} from "../middleware/authMiddleware"
import { roleMiddleware} from "../middleware/roleMiddleware"
import { UsuarioRole } from "../entities/Usuario"
import { validateDTO } from '../middleware/validate';
import { AgendarConsultaDTO } from '../dtos/consulta/AgendarConsultaDTO';
import { AtualizarStatusConsultaDTO } from '../dtos/consulta/AtualizarStatusConsultaDTO';
import asyncHandler from "express-async-handler"

const consultaRoutes = Router()
const consultaController = new ConsultaController()

consultaRoutes.use(authMiddleware)

// Só o PACIENTE agenda consulta para si mesmo
/**
 * @openapi
 * /consultas:
 *   post:
 *     summary: Agenda uma consulta (somente PACIENTE)
 *     tags: [Consultas]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AgendarConsultaDTO'
 *     responses:
 *       '201': { description: Consulta agendada }
 *       '403': { description: "Papel diferente de PACIENTE" }
 *       '404': { description: Médico não encontrado }
 */
consultaRoutes.post(
    "/",
    roleMiddleware(UsuarioRole.PACIENTE),
    validateDTO(AgendarConsultaDTO),
    asyncHandler( async (req, res) => { await consultaController.agendar(req, res) })
)

// PACIENTE, MEDICO e ADMIN podem listar — cada um vê seu recorte
/**
 * @openapi
 * /consultas:
 *   get:
 *    summary: Lista consultas (PACIENTE vê as suas, MEDICO vê as suas, ADMIN vê todas)
 *    tags: [Consultas]
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      '200': { description: Lista de consultas }
 *      '403': { description: "Papel não autorizado" }
 *
 */
consultaRoutes.get(
  "/",
  roleMiddleware(UsuarioRole.PACIENTE, UsuarioRole.MEDICO, UsuarioRole.ADMIN),
  asyncHandler( async (req, res) => { await consultaController.listar(req, res) })
);

// Só o MEDICO altera o status (realizar/cancelar) de uma consulta
/**
 * @openapi
 * /consultas/{id}/status:
 *   patch:
 *     summary: Atualiza o status de uma consulta (somente o MEDICO responsável)
 *     tags: [Consultas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema: { type: string, format: uuid }
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AtualizarStatusConsultaDTO'
 *     responses:
 *       '200': { description: Status atualizado }
 *       '403': { description: "Consulta não pertence a este médico" }
 *       '404': { description: Consulta não encontrada }
 */
consultaRoutes.patch(
  "/:id/status",
  roleMiddleware(UsuarioRole.MEDICO),
  validateDTO(AtualizarStatusConsultaDTO),
  asyncHandler( async (req, res) => { await consultaController.atualizarStatus(req, res) })
);

export { consultaRoutes }