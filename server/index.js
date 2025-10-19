import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';


dotenv.config();
const app = express();  
const PORT = process.env.PORT || 5000;

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("MongoDB connected");
    } catch (error) {
        console.error("MongoDB connection failed:", error);
    }
};

app.use(cors());
app.use(express.json());


app.get('', (req, res) => {
    res.json("server is wake up")
})



app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on port ${PORT}`);
});