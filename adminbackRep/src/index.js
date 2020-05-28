const express = require ('express');
//const morgan = require('morgan'); 
const cors = require('cors');
const app = express();


//settings
app.set('port', process.env.PORT || 4000 )

//middelware
//app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());

//routes
app.use(require('./routes/index'));
app.use('/employee', require('./routes/employee'));


//public

//starting server
app.listen(app.get('port'),()=>{
    console.log('server on port ', app.get('port'));
})