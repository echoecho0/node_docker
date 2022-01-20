const express = require('express')
const mysql = require('mysql')
const mysqlConfig = require('./config')
const fs = require('fs')
const app = express()
const port = 3000

const connection = mysql.createConnection(mysqlConfig)

connection.connect()


// const data = JSON.parse(fs.readFileSync('./test.json').toString())
// var addSql = 'INSERT INTO address(adcode,name,lon,lat) VALUES(?,?,?,?)';
// data.forEach(e => {
//     // var s = `UPDATE address SET name='${e.name}' WHERE adcode=${e.adcode};`
//     // console.log(s)
//     // console.log(e.name)
//     // console.log('台湾省')
//     // var s = `UPDATE address SET name='香港' WHERE adcode=820000;`
//     var addSqlParams = [e.adcode, e.name, e.lon, e.lat];
//     // connection.query(s)
//     connection.query(addSql, addSqlParams, function(err, result) {
//         if (err) {
//             console.log('[INSERT ERROR] - ', err.message);
//             return;
//         }

//         console.log('--------------------------INSERT----------------------------');
//         //console.log('INSERT ID:',result.insertId);        
//         console.log('INSERT ID:', result);
//         console.log('-----------------------------------------------------------------\n\n');
//     });
// });
// // connection.end()
console.log(process.env)
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

app.get('/', (req, res) => {
    // connection.connect()

    connection.query('SELECT * from address', function(err, rows, fields) {
        if (err) throw err
        console.log(typeof rows[0])
        console.log(rows[0].adcode)
        console.log('The solution is: ', rows[0].solution)
        res.json(rows)
    })

    // connection.end()
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})