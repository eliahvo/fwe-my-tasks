import { Connection, createConnection } from "typeorm";

/**
 * creates a connection to database
 * @returns a connection to database
 */
export const createDBconnection = async (): Promise<Connection> => {

  let conn: Connection;
  
  createConnection({
    type: "mysql",
    host: "mariadb",
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    entities: ["./src/entity/*.ts"],
    synchronize: false,
    logging: false
  }).then(connection => {
    conn = connection;
    console.log("connected to db");
  }).catch(error => console.log(error));
  return conn;
}
