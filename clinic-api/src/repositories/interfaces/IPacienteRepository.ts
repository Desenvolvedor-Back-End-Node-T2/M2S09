import { Paciente } from '../../entities/Paciente'

export interface IPacienteRepository{
    criar(dados: Partial<Paciente>): Paciente
    salvar(usuario: Paciente): Promise<Paciente>
    buscarPorUsuarioId(usuarioId: string): Promise<Paciente | null>
    buscarPorId(id: string): Promise<Paciente | null>
    listarTodos(): Promise<Paciente[]>
}