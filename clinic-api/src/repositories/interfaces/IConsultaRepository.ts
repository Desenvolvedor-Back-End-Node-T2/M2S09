import { Consulta } from '../../entities/Consulta';

export interface IConsultaRepository {
  criar(dados: Partial<Consulta>): Consulta;
  salvar(consulta: Consulta): Promise<Consulta>;
  buscarPorId(id: string): Promise<Consulta | null>;
  listarPorPaciente(pacienteId: string): Promise<Consulta[] | null>;
  listarPorMedico(medicoId: string): Promise<Consulta[] | null>;
  listarTodas(): Promise<Consulta[]>;
}