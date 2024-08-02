import express from "express";
import dotenv from "dotenv";
import deproute from "./Router/deproute.js";
import Employee from "./Model/Employee.js";
import mongoose from "mongoose";
import cors from "cors";
import authroute from "./Router/authroute.js"
dotenv.config();

const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
};

app.use(cors(corsOptions));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, async () => {
      console.log("listening on port ", process.env.PORT);
      
    });
  })
  .catch((error) => {
    console.log(error);
  });

 

app.use(deproute);
app.use(authroute);