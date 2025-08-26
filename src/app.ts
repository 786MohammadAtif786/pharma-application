
import express, {Request, Response} from "express";
import dotenv from "dotenv";
import connectDB from "./config/db"

const app = express();
dotenv.config();
const Port = process.env.PORT || 4000;
connectDB();

app.use(express.json());


app.get("/", (req: Request, res:Response) => {
    res.json({msg: "Welcome to pharma application"})
});


app.listen(Port, () => {
    console.log(`server lsiten ${Port}`);
    
})