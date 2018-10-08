require('./workbank.js')();

const express = require('express');
const path = require('path');

const app = express();
// const sqlite3 = require('sqlite3').verbose();

// const db = new sqlite3.Database('table.db');

// Route the root of the url to the React build
app.use(express.static(path.resolve(__dirname, '..', 'build')));
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

app.get('/word', (req, res) => {
    let wordbank = words();
    var rand = wordbank[Math.floor(Math.random()*wordbank.length)];
    var randarr = rand.split('');
    res.send(randarr);
});
// Create the table if it does not exist
// db.run('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY,fname TEXT,lname TEXT, address VARCHAR, company TEXT, salary INTEGER)');

// Return an array of company and and their employee salary sums
// app.get('/api/entries/companies', (req, res) => {
//   const sql = 'select company,sum(salary) as salary from users group by company';
//   db.all(sql, [], (err, rows) => {
//     if (err) {
//       throw err;
//     } else {
//       const ret = [];
//       rows.forEach((row) => {
//         ret.push({
//           company: row.company,
//           salary: row.salary,
//         });
//       });
//       res.send(ret);
//     }
//   });
// });

// Recieves employee data and insets it into the database
// app.post('/api/entries', (req, res) => {
//   const address = req.query.ad;
//   const company = req.query.co;
//   const fname = req.query.fn;
//   const lname = req.query.ln;
//   const salary = req.query.sa;
//   const stmt = db.prepare('INSERT INTO users (fname,lname,address,company,salary) VALUES(?,?,?,?,?)');
//   stmt.run(fname, lname, address, company, salary);
//   stmt.finalize();
//   const sql = `SELECT * FROM users
//            WHERE fname=?
//            AND lname=?
//            AND address=?
//            AND company=?
//            AND salary=?`;
//   db.get(sql, fname, lname, address, company, salary, (err, row) => {
//     if (err) {
//       return console.error(err.message);
//     }
//     res.send({
//       address: row.address,
//       company: row.company,
//       fname: row.fname,
//       lname: row.lname,
//       salary: row.salary,
//     });
//     res.end();
//   });
// });

module.exports = app;