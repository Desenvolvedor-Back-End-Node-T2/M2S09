import { Paciente } from "../../entities/Paciente";
import { IPacienteRepository } from "../interfaces/IPacienteRepository";

export class FakePacienteRepository implements IPacienteRepository{
    pacientes: Paciente[] = []

    criar(dados: Partial<Paciente>): Paciente{
        return { id: String(this.pacientes.length + 1), ...dados } as Paciente
    }

     async salvar(paciente: Paciente){
        this.pacientes.push(paciente)
        return paciente
    }

    async buscarPorId(pacienteId: string){
        return this.pacientes.find((p) => p.id === pacienteId) ?? null
    }

    async buscarPorUsuarioId(usuarioId: string){
        return this.pacientes.find((p) => p.usuario.id === usuarioId) ?? null
    }
    async listarTodos(){
        return this.pacientes
    }

}