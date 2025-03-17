import dotenv from "dotenv";
import ConnectDB from "./db/db.js";
import { app } from "./app.js";

dotenv.config();

const PORT = process.env.PORT || 8000;

ConnectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log("server is running on", PORT);
    });
  })
  .catch((err) => {
    console.log("error running the app", err);
  });
