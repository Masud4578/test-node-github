const express=require('express');
const hbs =require('hbs');
const fs=require('fs');

var app=express();

hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine','hbs');

//First middleware playground
app.use((req,res,next)=>{
    var now=new Date().toDateString();
    var log=`${now}: ${req.method} ${req.url}`;

    console.log(log);
    fs.appendFileSync('server.log',log+'\n');
    next();
});

//Checking middleware
// app.use((req,res,next)=>{
//     res.render('maintanence.hbs');
// });

app.use(express.static(__dirname+'/public'));


hbs.registerHelper('getCurrentDate',()=>{
    return new Date().toDateString();
});

hbs.registerHelper('screamIT',(text)=>{
    return text.toUpperCase();
});


//Routing

//Root route
app.get('/',(req,res)=>{
   res.render('home.hbs',{
       pageTitle:'Home Page',
       body:'Welcome to Home Page',
   });
});

//About Route
app.get('/about',(req,res)=>{
    res.render('about.hbs',{
        pageTitle:'About Page',
    });
})
app.listen(3000,()=>{
    console.log('Server is up on port 3000');
})