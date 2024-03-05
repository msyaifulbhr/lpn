import express from 'express';
import fileUpload from "express-fileupload";
import cors from 'cors';
import path from 'path';
import session from 'express-session';
import dotenv from "dotenv";
import db from "./config/Database.js";
import SequelizeStore from "connect-session-sequelize";
import AdminRoute from "./routes/AdminRoute.js";
import NewRoute from "./routes/NewRoute.js";
import AboutRoute from "./routes/AboutRoute.js";
import ServiceRoute from "./routes/LayananRoute.js";
import HeroRoute from "./routes/HeroRoute.js";
import AuthRoute from "./routes/AuthRoute.js";
dotenv.config();

const app = express();

const sessionStore = SequelizeStore(session.Store);

const store = new sessionStore({
    db: db
});

app.on("error", function () {
    console.log(arguments)
});

// (async () => {
//     await db.sync();
// })();

app.use(session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie:{
        secure: 'auto'
    }
}))

app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}));

app.use(express.json());
app.use(express.static("public"));
app.use(fileUpload());
app.use(AdminRoute);
app.use(NewRoute);
app.use(AboutRoute);
app.use(ServiceRoute);
app.use(HeroRoute);
app.use(AuthRoute);

/* final catch-all route to index.html defined last */
app.get('/*', (req, res) => {
    res.sendFile(path.resolve('public/index.html'));
})

// store.sync();

app.listen(process.env.APP_PORT,()=>{
    console.log("server BACKEND up and running...");
});