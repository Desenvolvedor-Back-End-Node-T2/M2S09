import { Usuario } from '../../entities/Usuario'

export interface IUsuarioRepository{
    criar(dados: Partial<Usuario>): Usuario
    salvar(usuario: Usuario): Promise<Usuario>
    buscarPorEmail(email: string): Promise<Usuario | null>
    buscarPorId(id: string): Promise<Usuario | null>
}