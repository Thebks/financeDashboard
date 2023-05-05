import express from "express"
import bodyParser from "body-parser"
import mongoose from "mongoose";
import cors from "cors"
import dotenv from "dotenv"
import helmet from "helmet"
import morgan from "morgan"
import kpiRoutes from "./routes/kpi.js"

// Middleware functions

dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

console.log("Yes its Working")
console.log("Check again")

// ROUTES
app.use(("./kpi", kpiRoutes))

// DB setup

const PORT = process.env.PORT || 7000;
mongoose.connect(process.env.MONGO_DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async () => {
        app.listen(PORT, () => console.log(`Server Port ${PORT}`))
    })
    .catch((error) => console.log(`${error} did not connect`))
