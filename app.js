const express =require('express');




const app= express();
// we need to call the express function.

const port =5000;

app.listen(port, ()=>{
	console.log(`server strated on port ${port}`); 
});