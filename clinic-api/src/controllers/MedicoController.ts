// src/controllers/MedicoController.ts
import { Request, Response } from 'express';

import { TypeOrmMedicoRepository } from '../repositories/typeorm/TypeOrmMedicoRepository';
import { MedicoService } from '../service/MedicoService';

const medicoService = new MedicoService(new TypeOrmMedicoRepository());

export class MedicoController {
  async listar(req: Request, res: Response) {
    const medicos = await medicoService.listarTodos();
    return res.json(medicos);
  }

  async meuPerfil(req: Request, res: Response) {
    const medico = await medicoService.buscarMeuPerfil(req.usuario!.sub);
    return res.json(medico);
  }
}