import express from "express"
const app = express()

app.use(express.json())

export {app};

import userRouter from "./routes/user.routes.js"

app.use("/api/v1/users", userRouter)