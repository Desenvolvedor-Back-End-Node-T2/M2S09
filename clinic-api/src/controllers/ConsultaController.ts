import { Request, Response } from "express"
import { ConsultaService } from "../service/ConsultaService";
import { TypeOrmConsultaRepository } from "../repositories/typeorm/TypeOrmConsultaRepository";
import { TypeOrmMedicoRepository } from "../repositories/typeorm/TypeOrmMedicoRepository";
import { TypeOrmPacienteRepository } from "../repositories/typeorm/TypeOrmPacienteRepository";

const consultaService = new ConsultaService(
   new TypeOrmConsultaRepository(),
   new TypeOrmMedicoRepository(),
   new TypeOrmPacienteRepository(),
);

export class ConsultaController {
   // POST /consultas
   async agendar(req: Request, res: Response) {
      const consulta = await consultaService.agendar(req.usuario!.sub, req.body);
      return res.status(201).json(consulta);
   }

   // GET /consultas
   async listar(req: Request, res: Response) {
      const { role, sub } = req.usuario!;
      const consultas = await consultaService.listarParaUsuario(role, sub);
      return res.json(consultas);
   }

   // PATCH /consultas/:id/status
   async atualizarStatus(req: Request, res: Response) {
      const consulta = await consultaService.atualizarStatus(
         req.params.id as string,
         req.body.status,
         req.usuario!.sub,
      );
      return res.json(consulta);
   }
}
