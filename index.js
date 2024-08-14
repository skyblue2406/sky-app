const express = require('express');
const app = express();
const port = 3000;

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

// Route to get worker information by worker ID
app.get('/workers/:id', (req, res) => {
    const workerId = req.params.id;
    const workerProfile = workers[workerId];

    if (workerProfile) {
        res.json(workerProfile);
    } else {
        res.status(404).json({ error: 'Worker not found' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`SKY app listening at http://localhost:${port}`);
});
