<<<<<<< HEAD
const mysql = require("mysql");
const dotenv = require("dotenv");
let instance = null;
dotenv.config();

const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DB_PORT,
});

connection.connect((err) => {
    if (err) {
        console.log(err.message);
    }
    //   console.log("db " + connection.state);
});

class DbService {
    static getDbServiceInstance() {
        return instance ? instance : new DbService();
    }
    async getAllData() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM names;";
                connection.query(query, (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                });
            });
            //   console.log(response);
            return response;
        } catch (error) {
            console.log(error);
        }
    }
    async getAttributes(id) {
        try {
            const data = await new Promise((resolve, reject) => {
                const query = `SELECT * FROM names WHERE id = '${id}' AND status = 1;`;
                connection.query(query, (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result);
                });
            });
            // console.log(data);
            return data;
        } catch (error) {
            console.log("error" + error);
        }
    }
    async insertNewProduct(prod_code, prod_weight) {
        try {
            const dateAdded = new Date();
            const insertId = await new Promise((resolve, reject) => {
                const query =
                    "INSERT INTO names (name,date_added,weight,status) VALUES (?,?,?,?)";
                connection.query(
                    query, [prod_code, dateAdded, prod_weight, 1],
                    (err, result) => {
                        if (err) reject(new Error(err.message));
                        resolve(result.insertId);
                    }
                );
            });
            console.log(insertId);
            return insertId;
        } catch (err) {
            console.log(err);
        }
    }
    async product_dispatched(prod_id, biller_code) {
        try {
            const update_status = await new Promise((resolve, reject) => {
                const query = `UPDATE names SET status = '${biller_code}' WHERE id='${prod_id}'`;
                connection.query(query, (err, result) => {
                    if (err) {
                        reject(new Error(err.message));
                    }
                    resolve(result);
                });
            });
        } catch (err) {
            res.status(502).end;
            console.log(err + `${prod_id} was not changed`);
        }
    }
}
=======
const mysql = require("mysql");
const dotenv = require("dotenv");
let instance = null;
dotenv.config();

const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DB_PORT,
});

connection.connect((err) => {
    if (err) {
        console.log(err.message);
    }
    //   console.log("db " + connection.state);
});

class DbService {
    static getDbServiceInstance() {
        return instance ? instance : new DbService();
    }
    async getAllData() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM names;";
                connection.query(query, (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                });
            });
            //   console.log(response);
            return response;
        } catch (error) {
            console.log(error);
        }
    }
    async getAttributes(id) {
        try {
            const data = await new Promise((resolve, reject) => {
                const query = `SELECT * FROM names WHERE id = '${id}' AND status = 1;`;
                connection.query(query, (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result);
                });
            });
            // console.log(data);
            return data;
        } catch (error) {
            console.log("error" + error);
        }
    }
    async insertNewProduct(prod_code, prod_weight) {
        try {
            const dateAdded = new Date();
            const insertId = await new Promise((resolve, reject) => {
                const query =
                    "INSERT INTO names (name,date_added,weight,status) VALUES (?,?,?,?)";
                connection.query(
                    query, [prod_code, dateAdded, prod_weight, 1],
                    (err, result) => {
                        if (err) reject(new Error(err.message));
                        resolve(result.insertId);
                    }
                );
            });
            console.log(insertId);
            return insertId;
        } catch (err) {
            console.log(err);
        }
    }
}
>>>>>>> 2156bf589455dea20b0671d8cc04ead44e07df50
module.exports = DbService;