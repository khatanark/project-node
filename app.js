const express =require('express');
const exphbs  = require('express-handlebars');
const methodOverride = require('method-override');
const bodyParser = require('body-parser' );
const mongoose = require('mongoose');


const app = express();

// Map global promise - get rid of warning
mongoose.Promise = global.Promise;
// Connect to mongoose
mongoose.connect('mongodb://localhost/vidjot-dev')
  .then(() => console.log('MongoDB Connected...'))
   .catch(err => console.log(err));


  // Load Idea model. So first we require the file we created. 

  require('./models/Idea');
  // in this we pass the name of the model.
  const Idea= mongoose.model('ideas');


// Note- Lot of the middleware have their middlewares.
// Handlebars  middleware.

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars'); // We are telling the system that we are using handlebar template engine.

// By default handlebars uses the views directory. So we need to create view directory.
//Def layout main - which contains the common section for ex header.Inside views create a folder layouts and create a file main.handlebars 
//Layouts wraps the other views indside the main.



// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Method override middleware 
app.use(methodOverride('X-HTTP-Method-Override'));


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
 
app.get('/about',(req,res)=>{
res.render('about');
});

//Idea index page
app.get('/ideas', (req,res)=>{
  Idea.find({}).then(ideas=>{
    res.render('ideas/index' ,{ 
      ideas:ideas 

    });
  });
});


// Add idea form 
app.get('/ideas/add',(req,res)=>{
	res.render('ideas/add')
});

// Edit Idea Form
app.get('/ideas/edit/:id', (req, res) => {
  Idea.findOne({
    _id: req.params.id
  })
  .then(idea => {
    res.render('ideas/edit', {
      idea:idea
    });
  });
});


// Process form
app.post('/ideas', (req,res)=>{
	let errors =[];
	if(!req.body.title){
		errors.push({text:'Please add a title'});
	}
    if(!req.body.details){
		errors.push({text:'Please add some details'});
	}
   if(errors.length>0){
   	res.render('ideas/add',{
    errors: errors,
    title: req.body.title,
    details: req.body.details
   	});
   } else{
   	const newUser = {
   		title: req.body.title,
   		details: req.body.details
   	}
   	// Idea came from the model created above. 
   	new Idea(newUser).save().then(idea=>{
   		res.redirect('/ideas'); 
   	})

   } 

});

//Aboute routes
app.get('/about', (req,res)=>{
res.send('ABOUT');
});

// Edit Form process
app.post('/ideas/:id', (req, res) => {
  Idea.findOne({
    _id: req.params.id
  })
  .then(idea => {
    // new values
    idea.title = req.body.title;
    idea.details = req.body.details;

    idea.save()
      .then(idea => {
        res.redirect('/ideas');
      })
  });
});

// Delete Idea
 app.delete('/ideas/:id', (req,res)=>{
  Idea.remove({_id:req.params.id})
  .then(()=>{
    res.redirect('/ideas');
  });
 });



const port =5000;
app.listen(port, ()=>{
	console.log(`server strated on port ${port}`); 
});