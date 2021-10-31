import mysql from 'mysql2';
import { config } from '../config.js';

const pool = mysql.createPool({
  host: config.mysqlDb.host,
  user: config.mysqlDb.user,
  password: config.mysqlDb.password,
  database: config.mysqlDb.database,
});

pool.getConnection(function(err){
  if(err) throw err;
  console.log('connected!');
});

export const db = pool.promise();
