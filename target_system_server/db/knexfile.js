// knexfile.js
export const knexConfig = {
  development: {
    client: "mysql2",
    connection: {
      host: "127.0.0.1",
      user: "root",
      password: "Ara1999@13",
      database: "targetDB",
    },
    useNullAsDefault:true,
    migrations: {
      directory: "./migrations",
    },
    seeds: {
      directory: "./seeds",
    },
  },
};
