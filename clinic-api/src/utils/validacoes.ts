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