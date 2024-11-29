import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import fileUpload from "express-fileupload";
import xlsx from "xlsx";
import cookieParser from "cookie-parser";
import db from './DB/conn.js';
const { connectDB, sequelize } = db;

// Import models
import './model/userSchema.js';
import './model/hallSchema.js';
import './model/bookingSchema.js';

// Import routes
import authRoutes from './router/authRoutes.js';
import bookingRoutes from './router/bookingRoutes.js';
import hallRoutes from './router/hallRoutes.js';

const app = express();

// Middleware Setup
app.use(cookieParser());
app.use(fileUpload());
app.use(cors({
  credentials: true,
  origin: ['http://localhost:3000', 'https://venuebooking-test.lnmiit.ac.in/']
}));

app.set("trust proxy", 1);
app.use(express.json());

// Load environment variables
dotenv.config({ path: "./.env" });

// Route imports
app.use(authRoutes);
app.use(bookingRoutes);
app.use(hallRoutes);

// Establish MySQL connection and sync models
connectDB()
  .then(() => {
    // Sync Sequelize models with the database
    sequelize.sync({alter:true})
      .then(() => {
        console.log("Sequelize models synchronized successfully!");
      })
      .catch(err => {
        console.error("Error syncing models:", err);
      });
  })
  .catch(err => {
    console.error("Error connecting to the database:", err);
  });

// Start the server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
