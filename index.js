const mysql = require('mysql')
const express = require('express')
var app = express();
const bodyparser = require('body-parser');

app.use(bodyparser.json())

const mysqlConnection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'password',
    database:'productdb',
    multipleStatements: true
});

mysqlConnection.connect((err)=>{
    if(!err)
    console.log('DB Connection Succeded.')
    else
    console.log('DB Connection Failed \n Error:'+JSON.stringify(err,undefined,2));
});


app.listen(3000,()=>console.log('express server is running at port no :3000'));


//Get all Employees on console
/*app.get('/device',(res,req)=>{
    mysqlConnection.query('SELECT * FROM device',(err,rows,fields)=>{
        if(!err)
        console.log(rows);
        else
        console.log(err);
    })
})*/

app.get('/device',(req,res)=>{
    mysqlConnection.query('SELECT * FROM device',(err,rows,fields)=>{
        if(!err)
        res.send(rows);
        else
        console.log(err);
    })
})
//get data by id
app.get('/device/:id',(req,res)=>{
    mysqlConnection.query('SELECT * FROM device where id= ?',[req.params.id],(err,rows,fields)=>{
        if(!err)
        res.send(rows);
        else
        console.log(err);
    })
})

//delete an employee
app.delete('/device/:id',(req,res)=>{
    mysqlConnection.query('DELETE FROM device where id= ?',[req.params.id],(err,rows,fields)=>{
        if(!err)
        res.send('deleted successful');
        else
        console.log(err);
    })
})


//Insert an employees
app.post('/device', (req, res) => {
    let dev = req.body;
    var sql = "SET @id = ?;SET @name = ?;SET @description = ?;SET @ram = ?;SET @processor = ?;SET @type = ?; \
    CALL addoredit(@id,@name,@description,@ram,@processor,@type);";
    mysqlConnection.query(sql, [dev.id, dev.name, dev.description, dev.ram, dev.processor, dev.type], (err, rows, fields) => {
        if (!err)
            rows.forEach(element => {
                if(element.constructor == Array)
                res.send('Inserted id : '+element[0].id);
            });
        else
            console.log(err);
    })
});  

//Update an employees
app.put('/device', (req, res) => {
    let dev = req.body;
    var sql = "SET @id = ?;SET @name = ?;SET @description = ?;SET @ram = ?;SET @processor = ?;SET @type = ?; \
    CALL addoredit(@id,@name,@description,@ram,@processor,@type);";
    mysqlConnection.query(sql, [dev.id, dev.name, dev.description, dev.ram, dev.processor, dev.type], (err, rows, fields) => {
        if (!err)
            res.send('Updated successfully');
        else
            console.log(err);
    })
});

