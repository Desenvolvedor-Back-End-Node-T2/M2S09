import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { IMedicoRepository } from "../interfaces/IMedicoRepository";
import { Medico } from "../../entities/Medico";

export class TypeOrmMedicoRepository implements IMedicoRepository{
    private repo: Repository<Medico> = AppDataSource.getRepository(Medico)

    criar(dados: Partial<Medico>): Medico{
        return this.repo.create(dados)
    }

    salvar(Medico: Medico): Promise<Medico>{
        return  this.repo.save(Medico)
    }

    buscarPorUsuarioId(usuarioId: string): Promise<Medico | null>{
        return this.repo.findOne({ where: {
            usuario: {
                id: usuarioId
            }
        }})
    }

    buscarPorId(id: string): Promise<Medico | null>{
        return this.repo.findOneBy( { id } )
    }

    listarTodos(): Promise<Medico[]>{
        return this.repo.find()
    }
}