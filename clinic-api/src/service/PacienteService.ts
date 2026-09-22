// src/services/PacienteService.ts
import { AppError } from '../errors/AppError';
import { IPacienteRepository } from '../repositories/interfaces/IPacienteRepository';

export class PacienteService {
  constructor(private pacienteRepository: IPacienteRepository) {}

  async buscarMeuPerfil(usuarioId: string) {
    const paciente = await this.pacienteRepository.buscarPorUsuarioId(usuarioId);
    if (!paciente) {
      throw new AppError('Paciente não encontrado', 404);
    }
    return paciente;
  }

  listarTodos() {
    return this.pacienteRepository.listarTodos();
  }
}