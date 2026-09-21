import { Medico } from "../../entities/Medico";

export interface IMedicoRepository{
    criar(dados: Partial<Medico>): Medico
    salvar(usuario: Medico): Promise<Medico>
    buscarPorUsuarioId(usuarioId: string): Promise<Medico | null>
    buscarPorId(id: string): Promise<Medico | null>
    listarTodos(): Promise<Medico[]>
}