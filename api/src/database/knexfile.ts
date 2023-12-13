import { Knex } from "knex";

const config: Knex.Config = {
  client: "mysql",
  connection: {
    host: "localhost",
    user: "docker",
    password: "docker",
    database: "my_db",
    charset: "utf8",
  },
};

export default config;
