import { CorsOptions } from "cors";
import { AppError } from "../errors/AppError";

export function criarCorsOptions(origensPermitidas: string[]): CorsOptions {
    return {
        origin(origin, callback) {
            if (!origin || origensPermitidas.includes(origin)) {
                return callback(null, true);
            }
            return callback(new AppError('Origem não é permitida pelo CORS', 403));
        },
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true,
        maxAge: 600, //10 minutos
    }
}