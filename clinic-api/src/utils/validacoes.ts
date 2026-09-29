export function calcularIdade(dataNascimento: string): number{
    const nascimento = new Date(dataNascimento)
        const hoje = new Date()
        let idade = hoje.getFullYear() - nascimento.getFullYear()

        const aindaNaoFezAniversario = hoje.getMonth() < nascimento.getMonth() || 
            (hoje.getMonth() === nascimento.getMonth() && hoje.getDate() < nascimento.getDate()) 
        
        if (aindaNaoFezAniversario) idade--

        return idade
}

export function emailValido(email: string): boolean{
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export function validarCrm(crm: string): void {
    if(!crm || crm.trim().length === 0){
        throw new Error('CRM não pode ser vazio')
    }
}

//exemplo de função assíncrono
export async function buscarSaudacao(nome: string): Promise<string> {
    return new Promise((resolve) => {
        setTimeout(() => resolve(`Olá, ${nome}!`), 10)
    })
}

export function podeAgendarConsulta(dataHora: Date): boolean{
    return dataHora.getTime() > Date.now()
}

export function validarSenha(senha: string): boolean{
    if (!senha || senha.length < 6){
        return false
    }

    return true
}