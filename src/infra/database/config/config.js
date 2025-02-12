const env = await import("../../../utils/env.js").then((mod) => mod.env);

export default async () => {
  const env = await import("../../../utils/env.js").then((mod) => mod.env);

  return {
    development: {
      username: env.POSTGRES_USER,
      password: env.POSTGRES_PASSWORD,
      database: env.POSTGRES_DB,
      host: env.POSTGRES_HOST,
      port: env.POSTGRES_PORT,
      dialect: "postgres",
      dialectModulePath: "pg",
      logging: false,
    },
    test: {
      username: env.POSTGRES_USER,
      password: env.POSTGRES_PASSWORD,
      database: env.POSTGRES_DB_TEST,
      host: env.POSTGRES_HOST,
      port: env.POSTGRES_PORT,
      dialect: "postgres",
      dialectModulePath: "pg",
      logging: false,
    },
    production: {
      username: env.POSTGRES_USER,
      password: env.POSTGRES_PASSWORD,
      database: env.POSTGRES_DB,
      host: env.POSTGRES_HOST,
      port: env.POSTGRES_PORT,
      dialect: "postgres",
      dialectModulePath: "pg",
      logging: false,
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
    },
  };
};


