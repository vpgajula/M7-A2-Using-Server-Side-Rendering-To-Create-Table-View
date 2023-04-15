//Set enviroment variables
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

//Template for Node.js Express Server
const express = require('express');

//Create Express App
const app = express();

const ejs = require('ejs');

//Use morgan for logging purposes
const morgan = require('morgan');

if (process.env.NODE_ENV === 'development') {
  //app.use(morgan('combined :method :url :status :res[content-length] - :response-time ms'))
  app.use(morgan('combined'))
}

const bodyParser = require('body-parser');
app.use(bodyParser.json());

//const app = require('./app');
//new code

//Path module provides utilities for working file and directory paths
const path = require('path');

//dirname is the directory name of the current module
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

//Set the view engine to ejs
app.set('view engine', 'ejs');

//Set the views directory
app.set('views', 'views');

//routes
const customerRoute = require('./routes/customerRoutes');
app.use('/api/customers', customerRoute);
const loanRoute = require('./routes/loanRoutes');
app.use('/api/loans', loanRoute);
const loanLedgerRoute = require('./routes/loanLedgerRoutes');
app.use('/api/loansledger', loanLedgerRoute);

//connecting to the database
const mongoose = require('mongoose');

//asynchronous DB connection with parameterized DB connection string
mongoose.connect(`mongodb+srv://${process.env.ATLAS_USERNAME}:
${process.env.ATLAS_PASSWORD}@${process.env.ATLAS_DBSERVER}/${process.env.DATABASE}`
  , { useNewUrlParser: true })
  .then(() => console.log(`MongoDB connection succeeded with ${process.env.DATABASE}...`))
  .catch((err) => console.log('Error in DB connection: ' + err));

//start the app and listen on port   
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
