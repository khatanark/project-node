const express =require('express');

const app= express();
// we need to call the express function.

 

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