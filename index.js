const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Sample data to simulate worker profiles
const workers = {
    'worker123': {
        id: 'worker123',
        name: 'John Doe',
        position: 'Software Engineer',
        department: 'IT',
        email: 'johndoe@example.com',
        phone: '+1234567890',
    },
    'worker456': {
        id: 'worker456',
        name: 'Jane Smith',
        position: 'Project Manager',
        department: 'Operations',
        email: 'janesmith@example.com',
        phone: '+0987654321',
    },
};

// Route to get worker information by worker ID (READ)
app.get('/workers/:id', (req, res) => {
    const workerId = req.params.id;
    const workerProfile = workers[workerId];

    if (workerProfile) {
        res.json(workerProfile);
    } else {
        res.status(404).json({ error: 'Worker not found' });
    }
});

// Route to create a new worker (CREATE)
app.post('/workers', (req, res) => {
    console.log(req.body); // This will log the incoming request body to the console

    const newWorker = req.body;

    // Check if the worker ID is provided
    if (!newWorker.id) {
        return res.status(400).json({ error: 'Worker ID is required' });
    }

    // Check if the worker ID already exists
    if (workers[newWorker.id]) {
        return res.status(400).json({ error: 'Worker ID already exists' });
    }

    // Add the new worker to the workers object
    workers[newWorker.id] = newWorker;
    res.status(201).json(newWorker);
});

// Route to update an existing worker (UPDATE)
app.put('/workers/:id', (req, res) => {
    const workerId = req.params.id;
    const updatedData = req.body;

    // Check if the worker exists
    if (workers[workerId]) {
        workers[workerId] = { ...workers[workerId], ...updatedData };
        res.json(workers[workerId]);
    } else {
        res.status(404).json({ error: 'Worker not found' });
    }
});

// Route to delete a worker (DELETE)
app.delete('/workers/:id', (req, res) => {
    const workerId = req.params.id;

    // Check if the worker exists
    if (workers[workerId]) {
        delete workers[workerId];
        res.status(204).send();  // No content
    } else {
        res.status(404).json({ error: 'Worker not found' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`SKY app listening at http://localhost:${port}`);
});
