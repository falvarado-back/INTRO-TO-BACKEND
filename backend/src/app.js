import express from "express"

const app = express();

app.use(express.json());

/*Routes import*/ 
import userRouter from "./routes/user.route.js";

/* routes declaration */
app.use("/api/v1/users", userRouter);
export default app;