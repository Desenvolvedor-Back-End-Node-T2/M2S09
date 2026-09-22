import { NextFunction, Router } from "express"
import { AuthController } from "../controllers/AuthController"
import { RegistrarPacienteDTO } from "../dtos/auth/RegistrarPacienteDTO";
import { validateDTO } from "../middleware/validate";
import { LoginDTO } from "../dtos/auth/LoginDTO";
import { RegistrarMedicoDTO } from "../dtos/auth/RegistrarMedicoDTO";
import asyncHandler from "express-async-handler"

const authRoutes = Router()
const authController = new AuthController()
/**
 * @openapi
 * /auth/register/paciente:
 *   post:
 *     summary: Cadastra um novo paciente
 *     tags: [Auth]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegistrarPacienteDTO'
 *     responses:
 *       '201':
 *         description: Paciente criado
 *       '400':
 *         description: Dados inválidos ou e-mail já cadastrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErroValidacao'
 */
authRoutes.post(
    "/register/paciente",
    validateDTO(RegistrarPacienteDTO),
    asyncHandler(async (req, res) => { await authController.registrarPaciente(req, res) }))

/**
 * @openapi
 * /auth/register/medico:
 *   post:
 *     summary: Cadastra um novo medico
 *     tags: [Auth]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegistrarMedicoDTO'
 *     responses:
 *       '201':
 *         description: Médico registrado com sucesso
 *       '400':
 *         description: Dados inválidos ou e-mail já cadastrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErroValidacao'
 */
authRoutes.post("/register/medico",
    validateDTO(RegistrarMedicoDTO),
    asyncHandler(async (req, res) => { await authController.registrarMedico(req, res) }))

/**
 * @openapi
 * /auth/login:
 *   post:
 *     summary: Autentica um usuário (paciente, médico ou admin)
 *     tags: [Auth]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginDTO'
 *     responses:
 *       '200':
 *         description: Login bem-sucedido — retorna o token JWT
 *       '401':
 *         description: Credenciais inválidas
 */
authRoutes.post("/login",
    validateDTO(LoginDTO),
    asyncHandler(async (req, res) => { await authController.login(req, res) }))

export { authRoutes }