import dotenv from "dotenv";
import connectDB from "./db/db.js";
import app from "./app.js"

dotenv.config();
connectDB()
  .then(() => {
    app.on("error", (error) => {
      console.log(`error occured in app!: ${error}`);
    });

    app.listen(process.env.PORT || 8000, () => {
      console.log(
        `Server is running at port: http://localhost/${process.env.PORT}`,
      );
    });
  })
  .catch((err) => {
    console.log(`MongoDB connection failed!: ${err}`);
  });
