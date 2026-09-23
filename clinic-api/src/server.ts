import 'reflect-metadata'
import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { AppDataSource } from './data-source'
import { routes } from './routes';
import { swaggerSpec } from './config/swagger';
import swaggerUi from 'swagger-ui-express'
import { errorHandler } from './middleware/errorHandler';
import { requestLogger } from './middleware/requestLogger';
import { logger } from './config/logger';


const app = express()
app.use(cors())
app.use(express.json())
app.use(requestLogger)
app.use(routes)
app.use(errorHandler);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

const PORT = process.env.PORT || 3333

AppDataSource.initialize()
.then(() => {
    logger.info("Conexão com o banco de dados (Aiven Server) estabelecida.")
    app.listen(PORT, () => {
        logger.info(`Servidor rodando em http://localhost:${PORT}`)
    })
}).catch((err) => {
    logger.error("Erro ao conectar com o banco de dados: ", err)
})