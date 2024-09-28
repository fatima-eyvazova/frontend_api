import mongoose from "mongoose";

export const db = () => {
  mongoose
    .connect(process.env.MONGO_URI,
    //      {
    //   useNewUrlParser: "true",
    //   useUnifiedTopology: "true",
    // }
    )
    .then(() => {
      console.log("connected to db");
    })
    .catch((err) => {
      console.log(err);
    });
};