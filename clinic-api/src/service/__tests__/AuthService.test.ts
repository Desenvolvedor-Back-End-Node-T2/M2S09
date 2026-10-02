import { RegistrarMedicoDTO } from "../../dtos/auth/RegistrarMedicoDTO";
import { UsuarioRole } from "../../entities/Usuario";
import { FakeMedicoRepository } from "../../repositories/fakes/FakeMedicoRepository";
import { FakePacienteRepository } from "../../repositories/fakes/FakePacienteRepository";
import { FakeUsuarioRepository } from "../../repositories/fakes/FakeUsuarioRepository";
import { AuthService } from "../AuthService";
import { describe, it, beforeEach, expect } from '@jest/globals'

// --------------------------------------------------------------------------------------------------
// TESTES
// --------------------------------------------------------------------------------------------------

describe('AuthService', () => {
    let usuarioRepository: FakeUsuarioRepository
    let pacienteRepository: FakePacienteRepository
    let medicoRepository: FakeMedicoRepository
    let authService: AuthService

    beforeEach(() => {
        usuarioRepository = new FakeUsuarioRepository()
        pacienteRepository = new FakePacienteRepository()
        medicoRepository = new FakeMedicoRepository()
        authService = new AuthService(usuarioRepository, pacienteRepository, medicoRepository)
    })

    it('deve cadastrar um paciente com sucesso', async () => {
        const resultado = await authService.registrarPaciente({
            nome: 'Davi Saldanha',
            email: 'davi@email.com',
            senha: '123456'
        })

        expect(resultado.email).toBe('davi@email.com')
        expect(resultado.role).toBe(UsuarioRole.PACIENTE)
        expect(usuarioRepository.usuarios).toHaveLength(1)
    })

    it('não deve cadastrar paciente com e-mail já existente', async() => {
        await authService.registrarPaciente({
            nome: 'Davi Saldanha',
            email: 'davi@email.com',
            senha: '123456'
        })

        await expect(authService.registrarPaciente({
            nome: 'Davi Saldanha',
            email: 'davi@email.com',
            senha: '123456'
        })).rejects.toThrow('E-mail já cadastrado')
    })

    // !verificar função gerarToken à partir do caso de teste
    it('deve autenticar com credencias válidas', async () => {
        await authService.registrarPaciente({
            nome: 'Davi Saldanha',
            email: 'davi@email.com',
            senha: '123456'
        })

        const resultado = await authService.login('davi@email.com', '123456')

        expect(resultado.token).toBeDefined();
        expect(resultado.usuario.email).toBe('davi@email.com')
    })

    it('deve cadastrar um médico com sucesso', async () => {
        const resultado = await authService.registrarMedico({
            nome: 'Davi Saldanha',
            email: 'davi@email.com',
            senha: '123456',
            crm: '123456-SP',
            especialidade: 'Clínico Geral'
        })

        expect(resultado.email).toBe('davi@email.com')
        expect(resultado.role).toBe(UsuarioRole.MEDICO)
        expect(usuarioRepository.usuarios).toHaveLength(1)
    })

    it('não deve cadastrar médico com e-mail já existente', async() => {
        await authService.registrarMedico({
            nome: 'Davi Saldanha',
            email: 'davi@email.com',
            senha: '123456',
            crm: '123456-SP',
            especialidade: 'Clínico Geral'
        })

        await expect(authService.registrarMedico({
            nome: 'Davi Saldanha',
            email: 'davi@email.com',
            senha: '123456',
            crm: '123456-SP',
            especialidade: 'Clínico Geral'
        })).rejects.toThrow('E-mail já cadastrado')
    })

    it('permite cadastrar um médico sem um usuário associado', async () => {
        const medico = medicoRepository.criar({
            usuario: undefined,
            crm: '123456-SP',
            especialidade: 'Clínico Geral'
        })

        const result = await expect(medicoRepository.salvar(medico))

        expect(result).toBeDefined()
     })

})