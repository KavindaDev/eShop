const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config');
const authJwt = require('./helper/jwt');
const api = process.env.API_URL;
const errorHandler = require('./helper/error-handler');

app.use(cors());  
app.options('*', cors());


//middleware
app.use(express.json());
app.use(morgan('tiny'));
app.use(authJwt());
app.use(errorHandler);


//product routers
const productRoutes = require('./routers/products');
const orderRoutes = require('./routers/orders');
const usersRoutes = require('./routers/users')
const categoriesRoutes = require('./routers/categories');



//routers
app.use(`${api}/products`, productRoutes );
app.use(`${api}/orders`, orderRoutes);
app.use(`${api}/users`, usersRoutes);
app.use(`${api}/categories`, categoriesRoutes);


mongoose.connect(process.env.CONNECTIONSTRING,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'ecom-db'
})
.then(() => {
    console.log('Database Running...!!!')
})
.catch((err) => {
    console.log(err);
})

app.listen(3000, ()=>{
    console.log('server is running in http://localhost:3000');
})