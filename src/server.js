const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Dish Schema
const dishSchema = new mongoose.Schema({
    name: String,
    image: String,
    rating: Number,
    time: String
});

const Dish = mongoose.model('Dish', dishSchema);

// Fetch all dishes
app.get('/api/dishes', async (req, res) => {
    try {
        const dishes = await Dish.find();
        res.json(dishes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Add a new dish (for testing)
app.post('/api/dishes', async (req, res) => {
    try {
        const newDish = new Dish(req.body);
        await newDish.save();
        res.json({ message: 'Dish added successfully!' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
