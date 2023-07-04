import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import hotelsRoute from "./routes/hotels.js";
import roomsRoute from "./routes/rooms.js";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();


/*CONNECTING TO THE DB*/
const connect = async () => {
    try {
      await mongoose.connect(process.env.MONGO, {
        
      });
      console.log("Conectado ao banco de dados!");
    } catch (error) {
      throw error;
    }
  };
  
  
connect();

mongoose.connection.on("disconnected", () =>{
    console.log("vai tomar no cu mongo");
})

mongoose.connection.on("connected", () =>{
    console.log("te amo puta");
})


/*MIDDLEWAREs*/
app.use(cookieParser());
app.use(express.json());


app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);

//ERROR HANDLER
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});


/*SETTING PORT*/ 
app.listen(8800, () =>{
    console.log("Connected to backend bitches!!");
});
