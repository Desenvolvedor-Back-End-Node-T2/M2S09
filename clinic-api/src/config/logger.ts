import winstom from 'winston'

const {combine, timestamp, printf, colorize, json } = winstom.format

const isProd = process.env.NODE_ENV === 'production'

const devFormat = combine(colorize(), timestamp({ format: 'HH:mm:ss'}),
    printf(({level, message, timestamp}) => `[${timestamp}] ${level}: ${message}`)
)
export const logger = winstom.createLogger({
    level: process.env.LOG_LEVEL || (isProd ? 'info' : 'debug'),
    format: isProd ? combine(timestamp(), json()) : devFormat,
    transports: [
        new winstom.transports.Console(),
        new winstom.transports.File({ filename: 'logs/error.log', level: 'error'}),
        new winstom.transports.File({ filename: 'logs/combined.log'})
    ]
})