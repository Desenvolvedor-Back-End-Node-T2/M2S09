import { buscarSaudacao, calcularIdade, emailValido, validarCrm } from '../validacoes'
import { describe, it, expect} from '@jest/globals'



describe('calcularidade', () => {
    it('calcular a idade quando o aniversário já passou este ano', () => {
        const anoNascimento = new Date().getFullYear() - 30
        const dataNascimento = `${anoNascimento}-01-01`

        const idade = calcularIdade(dataNascimento)

        expect(idade).toBe(30)
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
