import { Repository } from "typeorm";
import { IUsuarioRepository } from "../interfaces/IUsuarioRepository";
import { Usuario } from "../../entities/Usuario";
import { AppDataSource } from "../../data-source";

export class TypeOrmUsuarioRepository implements IUsuarioRepository{
    private repo: Repository<Usuario> = AppDataSource.getRepository(Usuario)

    criar(dados: Partial<Usuario>): Usuario{
        return this.repo.create(dados)
    }

    salvar(usuario: Usuario): Promise<Usuario>{
        return  this.repo.save(usuario)
    }

    buscarPorEmail(email: string): Promise<Usuario | null>{
        return this.repo.findOneBy({ email })
    }

    buscarPorId(id: string): Promise<Usuario | null>{
        return this.repo.findOneBy({ id })
    }

}