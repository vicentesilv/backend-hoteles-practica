import { TypeOrmModuleOptions } from "@nestjs/typeorm";

const nodeEnv = process.env.NODE_ENV?.toLowerCase() ?? 'development';
const isProduction = nodeEnv === 'production';
const dbSynchronize = process.env.DB_SYNCHRONIZE === 'true';

export const ormConfig: TypeOrmModuleOptions = {
    type: "mysql",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [__dirname + "/../**/*.entity{.ts,.js}"],
    synchronize: !isProduction && dbSynchronize,
};