import { beforeEach, describe, it, expect } from "@jest/globals";
import { FakeMedicoRepository } from "../../repositories/fakes/FakeMedicoRepository";
import { MedicoService } from "../MedicoService";
import { FakeUsuarioRepository } from "../../repositories/fakes/FakeUsuarioRepository";

describe('MedicoService', () => {
        let medicoRepository: FakeMedicoRepository
        let medicoService: MedicoService
        let usuarioRepository: FakeUsuarioRepository

        beforeEach(() => {
            medicoRepository = new FakeMedicoRepository()
            medicoService = new MedicoService(medicoRepository)
            usuarioRepository = new FakeUsuarioRepository()
        })

        it('lista médicos cadastrados', async () => {
            let u1 = usuarioRepository.criar({ nome: 'Davi Saldanha'})

            await medicoRepository.salvar(
                medicoRepository.criar({
                    usuario: u1,
                    crm: '123456-SP',
                    especialidade: 'Clínico Geral'
                }))
            
                const result = await medicoService.listarTodos()
                expect(result).toHaveLength(1)
        })

        it('lança 404 se o médico não existe', async () => {
            await expect(medicoService.buscarMeuPerfil('id-inexistente'))
                .rejects.toThrow('Médico não encontrado')
        })

        it('retorna perfil do médico existente', async () => {
            const medico = await medicoRepository.salvar(
                medicoRepository.criar({
                    usuario: usuarioRepository.criar({ nome: 'Davi Saldanha' }),
                    crm: '123456-SP',
                    especialidade: 'Clínico Geral'
                }))

            const result = await medicoService.buscarMeuPerfil(medico.id)
            expect(result).toEqual(medico)
        })
})