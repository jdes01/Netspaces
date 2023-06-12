import winston, { format, transports } from 'winston';
import LokiTransport from 'winston-loki'

const { combine, timestamp, label, printf, metadata } = format;

const myFormat = printf(({ level, message, label, timestamp, metadata }) => {
    return `${timestamp} [${label}] ${level}: ${message} - ${JSON.stringify(metadata)}`;
});

export class LoggerConfig {
    private readonly options: winston.LoggerOptions;

    constructor() {
        this.options = {
            exitOnError: false,
            format: combine(
                label({ label: 'dataservice-company' }),
                timestamp(),
                metadata({ fillExcept: ["level", "timestamp", "label", "message"] }),
                myFormat
            ),
            transports: [
                new transports.Console({ level: "debug" }),
                new LokiTransport({
                    host: "http://loki:3100",
                    labels: { job: 'dataservice-company' }
                })
            ], // alert > error > warning > notice > info > debug
        };
    }

    public console(): object {
        return this.options;
    }
}