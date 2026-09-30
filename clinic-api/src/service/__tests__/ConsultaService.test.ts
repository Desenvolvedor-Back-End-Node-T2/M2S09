import { beforeEach, describe, expect, it } from "@jest/globals";
import { FakeConsultaRepository } from "../../repositories/fakes/FakeConsultaRepository";
import { FakeMedicoRepository } from "../../repositories/fakes/FakeMedicoRepository";
import { ConsultaService } from "../ConsultaService";
import { FakePacienteRepository } from "../../repositories/fakes/FakePacienteRepository";
import { ConsultaStatus } from "../../entities/Consulta";

describe('ConsultaService', () => {
    let consultaRepository: FakeConsultaRepository
    let medicorepository: FakeMedicoRepository
    let pacienteRepsitory: FakePacienteRepository
    let consultaService: ConsultaService


    beforeEach(() => {
        consultaRepository = new FakeConsultaRepository()
        medicorepository = new FakeMedicoRepository()
        pacienteRepsitory = new FakePacienteRepository()
        consultaService = new ConsultaService(consultaRepository, medicorepository, pacienteRepsitory)
    })

    it('atualiza o status quando o médico é o dono da consulta', async () => {
        const medico = await medicorepository.salvar(
            medicorepository.criar({
            id: 'm1',
            usuario: {id: 'u1'} as any
        }))

        const consulta = await consultaRepository.salvar(
            consultaRepository.criar({
                id: 'c1',
                medico,
                status: ConsultaStatus.AGENDADA
            }))

        const resultado = await consultaService.atualizarStatus(
            consulta.id,
            ConsultaStatus.REALIZADA,
            'u1')
        
            expect(resultado.status).toBe(ConsultaStatus.REALIZADA)
    })

    it('lança 404 quando a consulta não existe', async () => {
        await expect(consultaService.atualizarStatus('id-inexistente', ConsultaStatus.REALIZADA, 'u1'))
            .rejects.toThrow('Consulta não encontrada')
    })

    it('lança 403 quando o médico não é dono da consulta', async () => {
        const medicoDono = await medicorepository.salvar(
            medicorepository.criar({
            id: 'm1',
            usuario: {id: 'u1'} as any
        }))

        await medicorepository.salvar(
            medicorepository.criar({
            id: 'm2',
            usuario: {id: 'u2'} as any
        }))

        const consulta = await consultaRepository.salvar(
            consultaRepository.criar({
                id: 'c1',
                medico: medicoDono,
                status: ConsultaStatus.AGENDADA
            }))

        await expect(
            consultaService.atualizarStatus(consulta.id, ConsultaStatus.REALIZADA, 'u2')
        ).rejects.toThrow('Você só pode alterar consultas atribuídas a você.')
    })
})