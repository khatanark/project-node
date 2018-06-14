const express =require('express');
const exphbs  = require('express-handlebars');
 

const app= express();
// we need to call the express function.

// Note- Lot of the middleware have their middlewares.
// Handlebars middleware.

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars'); // We are telling the system that we are using handlebar template engine.

// By default handlebars uses the views directory. So we need to create view directory.
//Def layout main - which contains the common section for ex header.Inside views create a folder layouts and create a file main.handlebars 
//Layouts wraps the other views indside the main.







//How middleware works.It is any piece code which has the access to the req and res objects
//app.use() is used to use a middleware. 
app.use(function(req,res,next){
console.log(Date.now());
next();
});

// Adding routes.
// index routes 
app.get('/',(req,res)=>{
res.render('index');
});

//Aboute routes
app.get('/about', (req,res)=>{
res.send('ABOUT');
});

const port =5000;
app.listen(port, ()=>{
	console.log(`server strated on port ${port}`); 
});