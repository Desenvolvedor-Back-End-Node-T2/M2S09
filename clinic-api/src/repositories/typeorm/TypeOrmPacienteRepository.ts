import { Repository } from "typeorm";
import { IPacienteRepository } from "../interfaces/IPacienteRepository";
import { Paciente } from "../../entities/Paciente";
import { AppDataSource } from "../../data-source";

export class TypeOrmPacienteRepository implements IPacienteRepository{
    private repo: Repository<Paciente> = AppDataSource.getRepository(Paciente)

    criar(dados: Partial<Paciente>): Paciente{
        return this.repo.create(dados)
    }

    salvar(Paciente: Paciente): Promise<Paciente>{
        return  this.repo.save(Paciente)
    }

    buscarPorUsuarioId(usuarioId: string): Promise<Paciente | null>{
        return this.repo.findOne({ where: {
            usuario: {
                id: usuarioId
            }
        }})
    }

    buscarPorId(id: string): Promise<Paciente | null>{
        return this.repo.findOneBy( { id } )
    }

    listarTodos(): Promise<Paciente[]>{
        return this.repo.find()
    }
}