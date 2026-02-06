const express = require('express');
const app = express();
 const dotenv = require('dotenv').config();
const ContactRoutes = require('./Routes/contactRoutes');
const errorHandler = require('./middlewear/errorHandler');
const connectDB = require('./config/dbConnection');
const userRoutes=require('./Routes/userRoutes')
const cors = require('cors');
//dotenv.config();
connectDB();
app.use(cors());
console.log("hello from server.js")
app.use(express.json());// what is this line about/does?
app.use("/api/contacts",ContactRoutes);// what is app.use? in express.js
app.use("/api/users",userRoutes);

app.use(errorHandler);// what is it here? what is does?


const PORT =process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
})

// what is api life cyle?