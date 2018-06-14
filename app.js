const express =require('express');

const app= express();
// we need to call the express function.

//How middleware works.It is any piece code which has the access to the req and res objects
//app.use() is used to use a middleware. 
app.use(function(req,res,next){
console.log(Date.now());
next();
});

// Adding routes.
// index routes 
app.get('/',(req,res)=>{
res.send('INDEX');
});

//Aboute routes
app.get('/about', (req,res)=>{
res.send('ABOUT');
});

const port =5000;
app.listen(port, ()=>{
	console.log(`server strated on port ${port}`); 
});