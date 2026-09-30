import { Medico } from "../../entities/Medico";
import { IMedicoRepository } from "../interfaces/IMedicoRepository";

export class FakeMedicoRepository implements IMedicoRepository{
    medicos: Medico[] = []

    criar(dados: Partial<Medico>): Medico{
        return { id: String(this.medicos.length + 1), ...dados } as Medico
    }

    async salvar(medico: Medico){
        this.medicos.push(medico)
        return medico
    }

    async buscarPorId(medicoId: string){
        return this.medicos.find((m) => m.id === medicoId) ?? null
    }

    async buscarPorUsuarioId(usuarioId: string){
        return this.medicos.find((m) => m.usuario.id === usuarioId) ?? null
    }
    async listarTodos(){
        return this.medicos
    }
}