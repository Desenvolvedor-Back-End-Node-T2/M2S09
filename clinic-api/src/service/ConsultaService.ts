import { AppError } from '../errors/AppError';
import { UsuarioRole } from '../entities/Usuario';
import { ConsultaStatus } from '../entities/Consulta';
import { IConsultaRepository } from '../repositories/interfaces/IConsultaRepository';
import { IMedicoRepository } from '../repositories/interfaces/IMedicoRepository';
import { IPacienteRepository } from '../repositories/interfaces/IPacienteRepository';
import { AgendarConsultaDTO } from '../dtos/consulta/AgendarConsultaDTO';

export class ConsultaService {
  constructor(
    private consultaRepository: IConsultaRepository,
    private medicoRepository: IMedicoRepository,
    private pacienteRepository: IPacienteRepository,
  ) {}

  async agendar(usuarioId: string, dados: AgendarConsultaDTO) {
    const { medicoId, data, observacoes } = dados;

    if (!medicoId || !data) {
      throw new AppError('medicoID e dataHora são obrigatórios');
    }

    const paciente = await this.pacienteRepository.buscarPorUsuarioId(usuarioId);
    if (!paciente) {
      throw new AppError('Paciente não encontrado.', 404);
    }

    const medico = await this.medicoRepository.buscarPorId(medicoId);
    if (!medico) {
      throw new AppError('Medico não encontrado.', 404);
    }

    const consulta = this.consultaRepository.criar({
      paciente, medico, dataHora: new Date(data), observacoes, status: ConsultaStatus.AGENDADA,
    });

    return this.consultaRepository.salvar(consulta);
  }


  async listarParaUsuario(role: UsuarioRole, usuarioId: string) {
    if (role === UsuarioRole.PACIENTE) {
      const paciente = await this.pacienteRepository.buscarPorUsuarioId(usuarioId);
      return this.consultaRepository.listarPorPaciente(paciente?.id ?? '');
    }

    if (role === UsuarioRole.MEDICO) {
      const medico = await this.medicoRepository.buscarPorUsuarioId(usuarioId);
      return this.consultaRepository.listarPorMedico(medico?.id ?? '');
    }

    return this.consultaRepository.listarTodas(); // ADMIN
  }


  async atualizarStatus(consultaId: string, novoStatus: ConsultaStatus, usuarioId: string) {
    if (!Object.values(ConsultaStatus).includes(novoStatus)) {
      throw new AppError('Status inválido.');
    }

    const consulta = await this.consultaRepository.buscarPorId(consultaId);
    if (!consulta) {
      throw new AppError('Consulta não encontrada.', 404);
    }

    const medico = await this.medicoRepository.buscarPorUsuarioId(usuarioId);
    if (!medico || consulta.medico.id !== medico.id) {
      throw new AppError('Você só pode alterar consultas atribuídas a você.', 403);
    }

    consulta.status = novoStatus;
    return this.consultaRepository.salvar(consulta);
  }
}