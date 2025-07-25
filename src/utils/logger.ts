import winston, { format } from "winston"

const myFormat = format.printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`
})
const logger = winston.createLogger({
    level: "info",
    format: format.combine(
        format.label({ label: "play time bot" }),
        format.timestamp(),
        myFormat
    ),
    transports: [
        new winston.transports.Console()
    ],
})


export default logger