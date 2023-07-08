const express = require('express')
const app = express();
// const cors = require('cors')
// app.use(cors);

app.use(express.json());
const dotenv = require('dotenv')
dotenv.config({path:__dirname+'/.env'});
require ('dotenv').config();
const dbConfig = require('./config/dbConfig');

const port = process.env.PORT||5000; 


const usersRoute = require('./routes/usersRoute');
const productsRoute = require('./routes/productsRoute');
const bidsRoute = require('./routes/bidsRoute')
const notificationsRoute = require('./routes/notificationsRoute')


app.use('/api/users',usersRoute);
app.use('/api/products',productsRoute);
app.use('/api/bids',bidsRoute);
app.use('/api/notifications',notificationsRoute);







app.listen(port,()=> console.log(`Node/Express Js started on port ${port}`));