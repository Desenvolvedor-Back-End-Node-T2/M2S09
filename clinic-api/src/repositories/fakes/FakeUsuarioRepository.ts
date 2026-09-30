import { Usuario } from "../../entities/Usuario";
import { IUsuarioRepository } from "../interfaces/IUsuarioRepository";

export class FakeUsuarioRepository implements IUsuarioRepository{
    usuarios: Usuario[] = []

    criar(dados: Partial<Usuario>): Usuario{
        return { id: String(this.usuarios.length + 1), ...dados } as Usuario
    }

    async salvar(usuario: Usuario){
        this.usuarios.push(usuario)
        return usuario
    }

    async buscarPorEmail(email: string){
        return this.usuarios.find((u) => u.email === email) ?? null
    }

    async buscarPorId(id: string){
        return this.usuarios.find((u) => u.id === id) ?? null
    }

}
