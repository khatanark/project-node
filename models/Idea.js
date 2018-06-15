const mongoose =require('mongoose');
const Schema = mongoose.Schema;


// create schema

const IdeaSchema =  new Schema(
{
	title: {
		type: String,
		required: true
	},
	details: {
		type: String,
		required: true
	},
	date:{
		type: Date,
		default: Date.now
	}
});
// converting schema into model?
// mongoose.model(modelName, schema.
mongoose.model('ideas', IdeaSchema);