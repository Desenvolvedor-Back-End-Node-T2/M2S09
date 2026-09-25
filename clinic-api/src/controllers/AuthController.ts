import {Request, Response} from "express"
import { AuthService } from "../service/AuthService";
import { TypeOrmUsuarioRepository } from "../repositories/typeorm/TypeOrmUsuarioRepository";
import { TypeOrmPacienteRepository } from "../repositories/typeorm/TypeOrmPacienteRepository";
import { TypeOrmMedicoRepository } from "../repositories/typeorm/TypeOrmMedicoRepository";

const authService = new AuthService(
    new TypeOrmUsuarioRepository(),
    new TypeOrmPacienteRepository(),
    new TypeOrmMedicoRepository()
)

export class AuthController{
    //POST /auth/register/paciente
    async registrarPaciente(req: Request, res: Response): Promise<Response>{
        const resultado = await authService.registrarPaciente(req.body)
        return res.status(201).json(resultado)
    }

    // POST /auth/register/medico
    async registrarMedico(req: Request, res: Response): Promise<Response>{
        const resultado = await authService.registrarMedico(req.body)
        return res.status(201).json(resultado)
    }

    //POST /auth/login
    async login(req: Request, res: Response): Promise<Response>{
       const { email, senha } = req.body
       const resultado = await authService.login(email, senha)
       return res.json(resultado)
    }

}