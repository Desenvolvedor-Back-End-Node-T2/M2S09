import { Request, Response, NextFunction } from 'express'
import { AppError } from '../errors/AppError'
import { logger } from '../config/logger';

export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction){
    if (err instanceof AppError){
        logger.error(err.message, { stack: err.stack, path: req.originalUrl})
        return res.status(err.statusCode).json({error: err.message})
    }

    console.error(err) //Será substituído por logging (winston)
    return res.status(500).json({ error: 'Erro interno no servidor'})
} 