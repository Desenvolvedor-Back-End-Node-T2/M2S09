// src/controllers/PacienteController.ts
import { Request, Response } from 'express';
import { TypeOrmPacienteRepository } from '../repositories/typeorm/TypeOrmPacienteRepository';
import { PacienteService } from '../service/PacienteService';

const pacienteService = new PacienteService(new TypeOrmPacienteRepository());

export class PacienteController {
  async meuPerfil(req: Request, res: Response) {
    const paciente = await pacienteService.buscarMeuPerfil(req.usuario!.sub);
    return res.json(paciente);
  }

  async listar(req: Request, res: Response) {
    const pacientes = await pacienteService.listarTodos();
    return res.json(pacientes);
  }
}