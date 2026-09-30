import { Consulta } from "../../entities/Consulta";
import { IConsultaRepository } from "../interfaces/IConsultaRepository";

export class FakeConsultaRepository implements IConsultaRepository{
    consultas: Consulta[] = []

    criar(dados: Partial<Consulta>): Consulta{
        return {id:String(this.consultas.length + 1), ...dados} as Consulta
    }

    async salvar(consulta: Consulta){
        this.consultas.push(consulta)
        return consulta
    }

    async buscarPorId(id: string){
        return this.consultas.find((c) => c.id === id) ?? null

    }

    async listarPorPaciente(pacienteId: string){
        return this.consultas.filter((c) => c.paciente.id === pacienteId) ?? null
    }

    async listarPorMedico(medicoId: string){
        return this.consultas.filter((c) => c.medico.id === medicoId) ?? null
    }

    async listarTodas(){
        return this.consultas
    }



}