const bodyParser = require('body-parser');
var express = require('express');
var session = require('express-session');
var flash = require('express-flash');
var app = express();
var swal = require('sweetalert');

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json());


app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))

app.use(flash());

app.get('/', (req,res) => {
    res.render('index');
})


// const willDelete = await swal({
//     title: "Are you sure?",
//     text: "Are you sure that you want to delete this file?",
//     icon: "warning",
//     dangerMode: true,
//  });

app.post('/form', (req, res) => {
    var {nome, email, pontos } = req.body;
    var alert = swal("Oops!", "Something went wrong!", "error");
    res.send(alert)
})

app.listen(5500, (req,res) =>{
    console.log('servidor na porta 5050')
});