const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db.js');
const userRouter = require('./routes/userRoute');

// App config
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());

// DB connection
connectDB();

// API endpoints
app.use("/user", userRouter)
app.use("/images", express.static('uploads'))

app.get('/', (req, res) => {
    res.send("Hello Backend");
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});