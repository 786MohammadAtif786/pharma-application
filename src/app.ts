
import express, {Request, Response} from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";
import authRoute from "./routes/authRouter";
import medicineRoute  from  "./routes/medicineRoutes";
import medicalStore from "./routes/medicalRoutes"

const app = express();
dotenv.config();
const Port = process.env.PORT || 4000;
connectDB();

app.use(express.json());
app.use("/", authRoute);
app.use("/", medicineRoute);
app.use("/medical", medicalStore);

app.get("/", (req: Request, res:Response) => {
    res.json({msg: "Welcome to pharma application"})
});


app.listen(Port, () => {
    console.log(`server lsiten ${Port}`);
    
})

//2.3 1ye