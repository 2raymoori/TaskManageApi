const express = require("express");
const dbHandle = require("./config/db");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const userRouter = require("./ROUTES/UserRoute");
const authRouter = require("./ROUTES/AuthRoute");
const taskRouter = require('./ROUTES/TaskRoute');
const PORT = process.env.PORT || 5001;
const app = express();

// initializing db Instance...
dbHandle();

// middleWare to Accept Request Body json
app.use(express.json());
app.use(cors());
app.use(
    fileUpload({
        createParentPath: true,
    })
);
// define server public folder
app.use(express.static(__dirname + "/public"));
// Route Invoke
app.use("/api/user", userRouter);
app.use("/api/task", taskRouter);
app.use("/api/auth", authRouter);

app.listen(PORT, () => {
    console.log("Server Successfully running on port "+PORT);
});

// react project
// Chat Application
//
