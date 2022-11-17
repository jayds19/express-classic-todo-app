const { dbConfig } = require("../config");
const mysqlConn = require("mysql").createConnection(dbConfig);

const task = {
  getTasks: () =>
    new Promise((resolve, reject) => {
      mysqlConn.query(
        "select * from task order by id desc;",
        (err, results) => {
          if (err) {
            reject(err);
            return;
          }

          resolve(results);
        }
      );
    }),
  createTask: (description, completed) =>
    new Promise((resolve, reject) => {
      mysqlConn.query(
        `insert into task values (default, '${description}', ${completed}, now());`,
        (err) => {
          if (err) {
            reject(err);
            return;
          }

          resolve("Task created");
        }
      );
    }),
  updateTask: (id, completed) =>
    new Promise((resolve, reject) => {
      mysqlConn.query(
        `update task set completed = ${completed} where id = ${id};`,
        (err) => {
          if (err) {
            reject(err);
            return;
          }

          resolve("Task created");
        }
      );
    }),
  deleteTask: (taskId) =>
    new Promise((resolve, reject) => {
      mysqlConn.query(
        `delete from task where id = ${taskId};`,
        (err, results) => {
          if (err) {
            reject(err);
            return;
          }

          resolve(results);
        }
      );
    }),
};
module.exports = { mysqlConn, task };
