// src/services/MedicoService.ts
import { AppError } from '../errors/AppError';
import { IMedicoRepository } from '../repositories/interfaces/IMedicoRepository';

export class MedicoService {
  constructor(private medicoRepository: IMedicoRepository) {}

  listarTodos() {
    return this.medicoRepository.listarTodos();
  }

  async buscarMeuPerfil(usuarioId: string) {
    const medico = await this.medicoRepository.buscarPorUsuarioId(usuarioId);
    if (!medico) {
      throw new AppError('Médico não encontrado.', 404);
    }
    return medico;
  }
}