const express = require('express');
const fs = require('fs');
const app = express();

// Middleware to handle errors during asynchronous file read
app.get('/readFileSync', (req, res, next) => {
    try {
        const data = fs.readFileSync('/path/to/your/file.txt', 'utf8');
        res.send(data); // Send the file data as response
    } catch (err) {
        next(err); // Pass the error to the error handler
    }
});

// Asynchronous error handling with setTimeout
app.get('/errorExample', (req, res, next) => {
    setTimeout(() => {
        try {
            console.log(a); // This will throw a ReferenceError
        } catch (err) {
            next(err); // Pass the error to the error handler
        }
    }, 1000);
});

// Asynchronous file read with error handling
app.get('/readFile', (req, res, next) => {
    fs.readFile('/path/to/your/file.txt', 'utf8', (err, data) => { 
        if (err) {
            return next(err); // Pass the error to the error handler
        }
        res.send(data); // Send the file data as response
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err); // Log the error for debugging
    res.status(500).send(err.message); // Send a 500 response
});

// Start the server
app.listen(5000, () => {
    console.log('Application running on port 5000');
});
