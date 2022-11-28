// eslint-disable-next-line @typescript-eslint/no-var-requires,@typescript-eslint/naming-convention,@typescript-eslint/no-explicit-any
import { TypeOrmModuleOptions } from "@nestjs/typeorm/dist/interfaces/typeorm-options.interface";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";

// Default configuration
const baseConfig: TypeOrmModuleOptions = {
  type: "postgres",
  host: "localhost",
  port: 3002,
  username: "postgres",
  password: "postgres",
  database: "postgres",
  keepConnectionAlive: true,
  synchronize: false,
  logging: ["migration", "error"],
  entities: ["dist/db/entity/*.js"],
  migrations: ["dist/db/migration/*.js"],
  namingStrategy: new SnakeNamingStrategy(),
};

// Dev env configuration
const devConfig: TypeOrmModuleOptions = {
  logging: ["migration", "warn", "error"],
};

// Prod env configuration
const prodConfig: TypeOrmModuleOptions = {};

const testConfig: TypeOrmModuleOptions = {
  logging: ["migration", "warn", "error"],
  entities: ["src/db/entity/*.ts"],
  migrations: ["src/db/migration/*.ts"],
};

export const getConfig = (env: string): TypeOrmModuleOptions => {
  if (env === "development") {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    return { ...baseConfig, ...devConfig };
  }
  if (env === "production") {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    return { ...baseConfig, ...prodConfig };
  }
  if (env === "test") {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    return { ...baseConfig, ...testConfig };
  }
  return baseConfig;
};

export const config = getConfig(process.env.NODE_ENV ?? "");
