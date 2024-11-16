const express = require('express');
const services = require('./services.json');
const fs = require('fs');
const app = express();
const dbConnect = require('./db/index.js');
const user = require('./models/user.js');

async function checkConnection() {
    try {
        await dbConnect();
        console.log("DB connected successfully.");
    } catch (error) {
        console.error("DB connection failed:", error);
    }
}

checkConnection();

const port = 5000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());  // Ensure body is parsed as JSON

// GET all services
app.get('/api/service', async (req, res) => {
    try {
        const userData = await user.find();
        res.json(userData);
    } catch (error) {
        res.status(500).json({ message: "Error fetching services", error });
    }
});

// POST new service
app.post('/api/service', async (req, res) => {
    let values = req.body;

    if (!values.serviceName || !values.price) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        let result = await user.create({
            serviceName: values.serviceName,
            price: values.price
        });
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ message: "Error creating service", error });
    }
});

// GET service by ID
app.get('/api/service/:id', async (req, res) => {
    try {
        let data = await user.findById(req.params.id);
        if (!data) {
            return res.status(404).json({ message: "Service not found" });
        }
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: "Error fetching service", error });
    }
});

// PUT update service by ID
app.put('/api/service/:id', async (req, res) => {
    try {
        const updatedService = await user.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedService) {
            return res.status(404).json({ message: "Service not found" });
        }
        return res.json(updatedService);
    } catch (error) {
        res.status(500).json({ message: "Error updating service", error });
    }
});

// DELETE service by ID
app.delete('/api/service/:id', async (req, res) => {
    try {
        const deletedService = await user.findByIdAndDelete(req.params.id);
        if (!deletedService) {
            return res.status(404).json({ message: "Service not found" });
        }
        return res.status(200).json({ message: `${req.params.id} deleted` });
    } catch (error) {
        res.status(500).json({ message: "Error deleting service", error });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is listening on http://localhost:${port}/api/service`);
});
