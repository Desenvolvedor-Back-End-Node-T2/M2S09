import { buscarSaudacao, calcularIdade, emailValido, podeAgendarConsulta, validarCrm, validarSenha } from '../validacoes'
import { describe, it, expect} from '@jest/globals'



describe('calcularidade', () => {
    it('calcular a idade quando o aniversário já passou este ano', () => {
        const anoNascimento = new Date().getFullYear() - 30
        const dataNascimento = `${anoNascimento}-01-01`

        const idade = calcularIdade(dataNascimento)

        expect(idade).toBe(30)
    })

    it('retorna 0 para alguém nascido hoje', () => {
        const hoje = new Date()
        const dataNascimentoStr = hoje.toISOString().split('T')[0]
        expect(calcularIdade(dataNascimentoStr)).toBe(0)
    })
})

describe('emailValido', () => {
    it('retorna true para um e-mail bem formado', () => {
        expect(emailValido('ana@email.com')).toBe(true)
    })

    it('retorna false quando falta o @', () => {
        expect(emailValido('ana.email.com')).toBe(false)
    })

    it('retorna false para uma string vazia', () => {
        expect(emailValido('')).toBe(false)
    })

    it('rejeita e-mail sem domínio (ex: ana@)', () => {
        expect(emailValido('ana@')).toBe(false)
    })
})

describe('validarCrm', () => {
    it('não lança erro para um CRM válido', () => {
        expect(() => validarCrm('12345-SP')).not.toThrow()
    })

    it('lança erro quando o CRM está vazio', () => {
        expect( () => validarCrm('')).toThrow('CRM não pode ser vazio')
    })
})

describe('buscarSaudacao', () => {
    it('resolve com a saudacao correta', async () => {
        const resultado = await buscarSaudacao('Robson')
        expect(resultado).toBe('Olá, Robson!')
    })
})

describe('podeAgendarConsulta', () => {
    it('retorna true para uma data no futuro', () => {
        const amanha = new Date(Date.now() + 24 * 60 * 60 * 1000)
        expect(podeAgendarConsulta(amanha)).toBeTruthy()
    })

    it('retorna false para uma data no passado', () => {
        const ontem = new Date(Date.now() - 24 * 60 * 60 * 1000)
        expect(podeAgendarConsulta(ontem)).toBeFalsy()
    })
})

describe('validarSenha', () => {
    it('aceita senha com 6 ou mais caracteres', () => {
        expect(validarSenha('123456')).toBe(true)
    })

    it('aceita senha com mais de 6 caracteres', () => {
        expect(validarSenha('senhaDeMais6Caracteres')).toBe(true)
    })

    it('refeita senha com menos de 6 caracteres', () => {
        expect(validarSenha('123')).toBe(false)
    })

    it('rejeita senha vazia', () => {
        expect(validarSenha('')).toBe(false)
    })
})