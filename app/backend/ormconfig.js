const config = {
    type: 'mysql',
    host: 'mariadb',
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    synchronize: false,
    logging: false,
    entities: ["./src/entity/*.ts"],
  };
  
module.exports = config;
