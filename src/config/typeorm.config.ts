import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeOrmConfig:TypeOrmModuleOptions = {

        type: 'postgres',
        host: 'localhost',
        port: 1234,
        username: 'postgres',
        password: '40028922',
        database: 'dev_ecommerce',
        entities: [
            __dirname + '/../**/*.entity{.ts,.js}',
        ],
        synchronize: true,
      }