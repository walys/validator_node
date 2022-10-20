const bodyParser = require('body-parser');
var express = require('express');
var session = require('express-session');
var flash = require('express-flash');
var app = express();
var cookieParser = require('cookie-parser');

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json());

app.use(cookieParser("sdjfsdkfhksdhfk"));

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}))

app.use(flash());

app.get('/', (req,res) => {

    var ErroPontos = req.flash("ErroPontos");
    var ErroEmail = req.flash("ErroEmail");
    var ErrorNome = req.flash("ErrorNome");

    // if(ErroEmail != undefined){
    //     if(ErroEmail.length == 0){
    //         ErroEmail = undefined
    //     }else{

    //     }
    // }
    //ErroEmail = (ErroEmail == undefined || ErroEmail.length == 0) ? undefined : undefined; 
    res.render('index', {
        ErroEmail,
        ErroPontos,
        ErrorNome,
        email:req.flash("email"),
        nome:req.flash("nome"),
        pontos:req.flash("pontos")
    });
})


app.post('/form', (req, res) => {
    var {nome, email, pontos } = req.body;

    var ErroPontos;
    var ErroEmail;
    var ErrorNome;
    
    if(pontos == undefined || pontos == '' || pontos > 20){
        ErroPontos = 'O pontos não ser fazio ou maior que 20!';
    }

    if(nome  == undefined || nome == ''){
        ErrorNome = 'O nome não ser fazio!';
    } 
    
    if(nome.length < 4){
        ErrorNome = 'O nome não pode ser menor que 4 caracteres!';
    }

    if(email  == undefined || email == ''){
        ErroEmail = 'O e-mail não ser fazio!';
    }

    if(ErroPontos !=  undefined || ErrorNome !=  undefined || ErroEmail !=  undefined){
        req.flash("ErroEmail", ErroEmail);
        req.flash("ErrorNome", ErrorNome);
        req.flash("ErroPontos", ErroPontos);
        req.flash("email", email);
        req.flash("nome", nome);
        req.flash("pontos", pontos);
        // res.send(`Erro ao enviar os dados: ${ErroMenasage}`);
        res.redirect("/");
    }else{
        res.send("Dados enviados com sucesso!");
    }

    //res.send(email);
})

app.listen(5500, (req,res) =>{
    console.log('servidor na porta 5500')
});