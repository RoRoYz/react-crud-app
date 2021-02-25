const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const mysql = require('mysql');

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "cruddb"
})

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}))

app.get('/api/get', (req,res) => {
    const sqlSelect = "SELECT * FROM accounts";
    db.query(sqlSelect, (err,result)=>{
        res.send(result);
    });
})

app.post('/api/insert', (req,res)=> {

    const accountName = req.body.accountName
    const accountEmail = req.body.accountEmail
    const accountContact = req.body.accountContact

    const sqlInsert = "INSERT INTO accounts (accountName, accountEmail, accountContact) VALUES (?,?,?)"
    db.query(sqlInsert, [accountName, accountEmail, accountContact], (err,result)=>{
        console.log(result);
    });
})

app.delete('/api/delete/:AccName', (req,res) => {
    const name = req.params.AccName;
    const sqlDelete="DELETE FROM accounts WHERE accountName = ?";
    db.query(sqlDelete,name, (err,res) => {
        if(err) console.log(err);
    });
})

app.put('/api/update/', (req,res) => {
    const contact = req.body.accountContact
    const name = req.body.accountName;
    const sqlUpdate="UPDATE accounts SET accountContact = ? WHERE accountName = ?";
    db.query(sqlUpdate,[contact,name], (err,res) => {
        if(err) console.log(err);
    });
})

app.listen(3001, () => {
    console.log('running on port 3001');
});