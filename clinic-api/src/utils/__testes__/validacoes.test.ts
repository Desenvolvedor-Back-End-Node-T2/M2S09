import { calcularIdade, emailValido } from '../validacoes'
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