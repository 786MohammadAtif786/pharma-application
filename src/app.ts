
import express, {Request, Response} from "express";

const app = express();

const Port = process.env.PORT || 3000;

app.use(express.json());


app.get("/", (req: Request, res:Response) => {
    res.json({msg: "Welcome to pharma application"})
});


app.listen(Port, () => {
    console.log(`server lsiten ${Port}`);
    
})