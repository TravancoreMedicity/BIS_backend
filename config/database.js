const { createPool } = require("mysql");

const pool = createPool({
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.MYSQL_DB,
    connectionLimit: 10,
    dateStrings: true
});

const hrpool = createPool({
    port: process.env.DB_PORT,
    host: process.env.HR_HOST,
    user: process.env.HR_DB_USER,
    password: process.env.HR_DB_PASS,
    database: process.env.HR_SQL,
    connectionLimit: 10,
    dateStrings: true
});

const milorapool = createPool({
    port: process.env.DB_PORT,
    host: process.env.DB_HOST_MEL,
    user: process.env.DB_USER_MEL,
    password: process.env.DB_PASS_MEL,
    database: process.env.MYSQL_DB_MEL,
    connectionLimit: 10,
    dateStrings: true
});

const hspgpool = createPool({
    port: process.env.DB_PORT,
    host: process.env.HR_HOST_HSPG,
    user: process.env.HR_DB_USER_HSPG,
    password: process.env.HR_DB_PASS_HSPG,
    database: process.env.HR_SQL_HSPG,
    connectionLimit: 10,
    dateStrings: true
});

module.exports = {
    pool,
    hrpool,
    milorapool,
    hspgpool
};
//module.exports = hrpool;