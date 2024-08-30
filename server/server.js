const express = require ("express")
const mongoose = require ("mongoose")
const cors = require ("cors")
const authRoute = require("./routes/authRoutes")
const taskRoute = require ("./routes/taskRoutes")
require ("dotenv").config()


const app = express()
app.use(express.json())
app.use(cors())


//connnectiong to mongodb
mongoose.connect(process.env.MONGODB_URI)
.then(() => {
    console.log("connected to mongodb")
})
.catch(() => {
    console.log("Error connecting to mongodb")
});

//Routes
app.use("/api/auth", authRoute);
app.use("/api/tasks", taskRoute);

//connecting to server
const PORT = process.env.PORT || 5000;
app.listen(PORT , () => {
    console.log(`server is running on port ${PORT}`)
});