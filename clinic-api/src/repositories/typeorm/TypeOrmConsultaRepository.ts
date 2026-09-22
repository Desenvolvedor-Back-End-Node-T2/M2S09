import { Repository } from 'typeorm';
import { AppDataSource } from '../../data-source';
import { Consulta } from '../../entities/Consulta';
import { IConsultaRepository } from '../interfaces/IConsultaRepository';

export class TypeOrmConsultaRepository implements IConsultaRepository {
    private repo: Repository<Consulta> = AppDataSource.getRepository(Consulta);

    criar(dados: Partial<Consulta>): Consulta {
        return this.repo.create(dados);
    }

    salvar(consulta: Consulta): Promise<Consulta> {
        return this.repo.save(consulta);
    }

    buscarPorId(id: string): Promise<Consulta | null> {
        return this.repo.findOneBy({ id });
    }

    listarPorPaciente(pacienteId: string): Promise<Consulta[]> {
        return this.repo.find({ where: { paciente: { id: pacienteId } }, order: { dataHora: 'ASC' } });
    }

    listarPorMedico(medicoId: string): Promise<Consulta[]> {
        return this.repo.find({ where: { medico: { id: medicoId } }, order: { dataHora: 'ASC' } });
    }

    listarTodas(): Promise<Consulta[]> {
        return this.repo.find({ order: { dataHora: 'ASC' } });
    }
}