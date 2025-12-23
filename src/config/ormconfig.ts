import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const ormConfig: TypeOrmModuleOptions = {
    type: "mysql",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [__dirname + "/../**/*.entity{.ts,.js}"],
    synchronize: true, 
};