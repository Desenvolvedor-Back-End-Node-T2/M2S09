import bcrypt from "bcryptjs";
import { RegistrarPacienteDTO } from "../dtos/auth/RegistrarPacienteDTO";
import { AppError } from "../errors/AppError";
import { IMedicoRepository } from "../repositories/interfaces/IMedicoRepository";
import { IPacienteRepository } from "../repositories/interfaces/IPacienteRepository";
import { IUsuarioRepository } from "../repositories/interfaces/IUsuarioRepository";
import { UsuarioRole } from "../entities/Usuario";
import { UsuarioResponseDTO } from "../dtos/usuario/UsuarioResponseDTO";
import { RegistrarMedicoDTO } from "../dtos/auth/RegistrarMedicoDTO";
import { gerarToken } from "../utils/jwt";
import { logger } from "../config/logger";

export class AuthService{
    constructor(
        private usuarioRepository: IUsuarioRepository,
        private pacienteRepository: IPacienteRepository,
        private medicoRepository: IMedicoRepository
    ){}

    async registrarPaciente(dados: RegistrarPacienteDTO){

        const { nome, email, senha, dataNascimento } = dados

        if(!nome || !email || !senha){
            throw new AppError('nome, email e senha são obrigatório')
        }

        const emailExiste = await this.usuarioRepository.buscarPorEmail(email)
        if(emailExiste){
            logger.error(`Conflito de e-mail: ${email}`)
            throw new AppError('E-mail já cadastrado')
        }

        const hashSenha = await bcrypt.hash(senha, 10)
        const usuario = this.usuarioRepository.criar({
            nome, email, senha: hashSenha, role: UsuarioRole.PACIENTE
        })
        await this.usuarioRepository.salvar(usuario)

        const paciente = this.pacienteRepository.criar({usuario, dataNascimento})
        await this.pacienteRepository.salvar(paciente)

        logger.info(`Paciente cadastrado com sucesso: (${paciente.id}, ${email}})`)
        return new UsuarioResponseDTO(usuario)

    }

    async registrarMedico(dados: RegistrarMedicoDTO){
        const { nome, email, senha, crm, especialidade } = dados

        if(!nome || !email || !senha || !crm || !especialidade){
            throw new AppError('nome, email, senha, crm e especialidade são obrigatório')
        }

        const emailExiste = await this.usuarioRepository.buscarPorEmail(email)
        if(emailExiste){
            logger.error(`Conflito de e-mail: ${email}`)
            throw new AppError('E-mail já cadastrado')
        }

        // ! [bug-fix]: implementar validação de crm UNIQUE

        const hashSenha = await bcrypt.hash(senha, 10)
        const usuario = this.usuarioRepository.criar({
            nome, email, senha: hashSenha, role: UsuarioRole.MEDICO
        })
        await this.usuarioRepository.salvar(usuario)

        const medico = this.medicoRepository.criar({usuario, crm, especialidade})
        await this.medicoRepository.salvar(medico)

        logger.info(`Médico cadastrado com sucesso: (${medico.id}, ${email}, ${medico.crm})`)
        return new UsuarioResponseDTO(usuario)
    }

    async login(email: string, senha: string){
        if(!email || !senha){
            throw new AppError('email, senha são obrigatórios')
        }

        const usuario = await this.usuarioRepository.buscarPorEmail(email)
        if(!usuario){
            throw new AppError('Credenciais Inválidas', 401)
            logger.warn(`Tentativa de login falhou para ${email}`)
        }

        const senhaCorreta = await bcrypt.compare(senha, usuario.senha)
        if (!senhaCorreta){
            throw new AppError('Credenciais Inválidas', 401)
            logger.warn(`Tentativa de login falhou para ${email}`)
        }

        const token = gerarToken({sub: usuario.id, role: usuario.role})
        logger.info(`Login bem-sucedido: usuario ${usuario.id} (${usuario.role})`)

        return {
            token,
            usuario
        }
    }
}