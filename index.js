// Import express and put it into express constant
const express = require('express');
// Create express object and put it into app constant
const app = express();

const usersController = require('./api/controllers/usersController');

// Middleware required for receiving body from request object as JSON
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Database mockup

const lecturers = [
    {
        id: 0,
        firstName: 'Kalle',
        lastName: 'Kuld',
        email: 'kalle.kuld@tlu.ee',
        userId: 0
    },
    {
        id: 1,
        firstName: 'Malle',
        lastName: 'Muld',
        email: 'malle.muld@tlu.ee',
        userId: 0
    },
];

const subjects = [
    {
        id: 0,
        name: 'Riistvara ja operatsioonisüsteemide alused',
        lecturerId: 0,
        userId: 0
    },
    {
        id: 1,
        name: 'Programmeerimine II',
        lecturerId: 0,
        userId: 0
    }
];

const homeworks = [
    {
        id: 0,
        description: 'Esimene kodutöö',
        dueDate: Date.now(),
        subjectId: 0,
        userId: 0
    },
    {
        id: 1,
        description: 'Teine kodutöö',
        dueDate: Date.now(),
        subjectId: 0,
        userId: 0
    }
];


// Endpoint for checking if API is alive (response 200 OK means, it is working)
// GET - ping
// Required values: none
// Optional values: none
// Returns: status 200 - OK and { success: true } message
app.get('/api/ping', (req, res) => {
    res.status(200).json({
        success: true
    });
});


app.get('/api/users', usersController.read);
app.get('/api/users/:id', usersController.readById);
app.post('/api/users', usersController.create); 
app.put('/api/users', usersController.update);
app.delete('/api/users', usersController.delete);

// Endpoint for getting list of available lecturers
// GET - lecturers
// Required values: none
// Optional values: none
// Returns: status 200 - OK and list of lecturers in response body
app.get('/api/lecturers', (req, res) => {
    // Return list of users
    res.status(200).json({
        success: true,
        lecturers
    });
});

// Endpoint for getting lecturer specified by id
// GET - lecturers
// Required: id
// Optional: none
// Returns: status 200 - OK and lecturer data in response body
app.get('/api/lecturers/:id', (req, res) => {
    // Return user with specified id
    res.status(200).json({
        success: true,
        lecturers: lecturers[req.params.id]
    });
});

// Endpoint for creating new lecturer
// POST - lecturers
// Required values: firstName, lastName, email
// Optional values: none
// Returns:
//  Success: status 201 - Created and lecturer data in response body
//  Fail: status 400 - Bad Request and error message in response body
app.post('/api/lecturers', (req, res) => {
    // Check if provided data is expected type (typeof) and has length when whitespace is removed (.trim().length)
    const firstName = typeof(req.body.firstName) === 'string' && req.body.firstName.trim().length > 0 ? req.body.firstName : false;
    const lastName = typeof(req.body.lastName) === 'string' && req.body.lastName.trim().length > 0 ? req.body.lastName : false;
    const email = typeof(req.body.email) === 'string' && req.body.email.trim().length > 0 ? req.body.email : false;
    const userId = typeof(req.body.userId) === 'number' ? req.body.userId : false;

    // Check if required data exists
    if (firstName && lastName && email && (userId || userId === 0)) {
        // Create new json with user data
        const newLecturer = {
            id: lecturers.length,
            firstName,
            lastName,
            email,
            userId
        };
        // Add lecturer to 'database'
        lecturers.push(newLecturer);

        // Return data
        res.status(201).json({
            success: true,
            lecturer: newLecturer
        });
    } else {
        // Return error message
        res.status(400).json({
            success: false,
            message: 'Required field(s) missing or invalid'
        });
    }
});

// Endpoint for updating lecturer specified by id
// PUT - lecturers
// Required: id
// Optional: firstName, lastName, email
// Returns:
//  Success: status 200 - OK and lecturer data in response body
//  Fail: status 400 - Bad Request and error message in response body
app.put('/api/lecturers', (req, res) => {
    // Next lines checking if provided data is expected type (typeof) and has length when whitespace is removed (.trim().length)
    const id = typeof(req.body.id) === 'number' ? req.body.id : false;
    const firstName = typeof(req.body.firstName) === 'string' && req.body.firstName.trim().length > 0 ? req.body.firstName : false;
    const lastName = typeof(req.body.lastName) === 'string' && req.body.lastName.trim().length > 0 ? req.body.lastName : false;
    const email = typeof(req.body.email) === 'string' && req.body.email.trim().length > 0 ? req.body.email : false;
    // Check if required data exists
    if(id || id === 0) {
        // Check if optional data exists
        if (firstName) {
            // Change user data in 'database'
            lecturers[id].firstName = firstName;
        }
        // Check if optional data exists
        if (lastName) {
            // Change user data in 'database'
            lecturers[id].lastName = lastName;
        }
        // Check if optional data exists
        if (email) {
            // Change user data in 'database'
            lecturers[id].email = email;
        }
        // Return updated user data
        res.status(200).json({
            success: true,
            lecturer: lecturers[id]
        });
    } else {
        // Return error message
        res.status(400).json({
            success: false,
            message: 'Required field(s) missing or invalid'
        });
    }
});

// Endpoint for deleting lecturer specified by id
// DELETE - lecturers
// Required: id
// Optional: none
// Returns:
//  Success: status 200 - OK and { success: true } message
//  Fail: status 400 - Bad Request and error message in response body
app.delete('/api/lecturers', (req, res) => {
    // Check if required data exists
    const id = typeof(req.body.id) === 'number' ? req.body.id : false;
    if(id || id === 0) {
        lecturers.splice(id, 1);
        // Return success message
        res.status(200).json({
            success: true
        });
    } else {
        // Return error message
        res.status(400).json({
            success: false,
            message: 'Required field(s) missing or invalid'
        });
    }
});


// Endpoint for getting list of available subjects
// GET - subjects
// Required values: none
// Optional values: none
// Returns: status 200 - OK and list of subjects in response body
app.get('/api/subjects', (req, res) => {
    // Return list of subjects
    res.status(200).json({
        success: true,
        subjects
    });
});

// Endpoint for getting subject specified by id
// GET - subjects
// Required: id
// Optional: none
// Returns: status 200 - OK and subject data in response body
app.get('/api/subjects/:id', (req, res) => {
    // Return subject with specified id
    res.status(200).json({
        success: true,
        subjects: subjects[req.params.id]
    });
});

// Endpoint for creating new subject
// POST - subjects
// Required values: name, lecturerId, userId
// Optional values: none
// Returns:
//  Success: status 201 - Created and lecturer data in response body
//  Fail: status 400 - Bad Request and error message in response body
app.post('/api/subjects', (req, res) => {
    // Check if provided data is expected type (typeof) and has length when whitespace is removed (.trim().length)
    const name = typeof(req.body.name) === 'string' && req.body.name.trim().length > 0 ? req.body.name : false;
    const lecturerId = typeof(req.body.lecturerId) === 'number' ? req.body.lecturerId : false;
    const userId = typeof(req.body.userId) === 'number' ? req.body.userId : false;

    // Check if required data exists
    if (name && (lecturerId || lecturerId === 0) && (userId || userId === 0)) {
        // Create new json with user data
        const newSubject = {
            id: lecturers.length,
            name,
            lecturerId,
            userId
        };
        // Add lecturer to 'database'
        subjects.push(newSubject);

        // Return data
        res.status(201).json({
            success: true,
            subject: newSubject
        });
    } else {
        // Return error message
        res.status(400).json({
            success: false,
            message: 'Required field(s) missing or invalid'
        });
    }
});

// Endpoint for updating subjects specified by id
// PUT - subjects
// Required: id
// Optional: name, lecturerId
// Returns:
//  Success: status 200 - OK and subject data in response body
//  Fail: status 400 - Bad Request and error message in response body
app.put('/api/subjects', (req, res) => {
    // Next lines checking if provided data is expected type (typeof) and has length when whitespace is removed (.trim().length)
    const id = typeof(req.body.id) === 'number' ? req.body.id : false;
    const name = typeof(req.body.name) === 'string' && req.body.name.trim().length > 0 ? req.body.name : false;
    const lecturerId = typeof(req.body.lecturerId) === 'number' ? req.body.lecturerId : false;
    // Check if required data exists
    if(id || id === 0) {
        // Check if optional data exists
        if (name) {
            // Change user data in 'database'
            subjects[id].name = name;
        }
        // Check if optional data exists
        if ((lecturerId || lecturerId === 0)) {
            // Change user data in 'database'
            subjects[id].lecturerId = lecturerId;
        }
        // Return updated user data
        res.status(200).json({
            success: true,
            subjects: subjects[id]
        });
    } else {
        // Return error message
        res.status(400).json({
            success: false,
            message: 'Required field(s) missing or invalid'
        });
    }
});

// Endpoint for deleting subject specified by id
// DELETE - subjects
// Required: id
// Optional: none
// Returns:
//  Success: status 200 - OK and { success: true } message
//  Fail: status 400 - Bad Request and error message in response body
app.delete('/api/subjects', (req, res) => {
    // Check if required data exists
    const id = typeof(req.body.id) === 'number' ? req.body.id : false;
    if(id || id === 0) {
        subjects.splice(id, 1);
        // Return success message
        res.status(200).json({
            success: true
        });
    } else {
        // Return error message
        res.status(400).json({
            success: false,
            message: 'Required field(s) missing or invalid'
        });
    }
});

// Endpoint for getting list of available homeworks
// GET - homeworks
// Required values: none
// Optional values: none
// Returns: status 200 - OK and list of homeworks in response body
app.get('/api/homeworks', (req, res) => {
    // Return list of homeworks
    res.status(200).json({
        success: true,
        homeworks
    });
});

// Endpoint for getting homework specified by id
// GET - homeworks
// Required: id
// Optional: none
// Returns: status 200 - OK and homework data in response body
app.get('/api/homeworks/:id', (req, res) => {
    // Return homework with specified id
    res.status(200).json({
        success: true,
        subjects: homeworks[req.params.id]
    });
});

// Endpoint for creating new homework
// POST - homeworks
// Required values: description, dueDate, subjectId, userId
// Optional values: none
// Returns:
//  Success: status 201 - Created and homework data in response body
//  Fail: status 400 - Bad Request and error message in response body
app.post('/api/homeworks', (req, res) => {
    // Check if provided data is expected type (typeof) and has length when whitespace is removed (.trim().length)
    const description = typeof(req.body.description) === 'string' && req.body.description.trim().length > 0 ? req.body.description : false;
    const dueDate = new Date();
    const subjectId = typeof(req.body.subjectId) === 'number' ? req.body.subjectId : false;
    const userId = typeof(req.body.userId) === 'number' ? req.body.userId : false;
    // Check if required data exists
    if (description && dueDate && (subjectId || subjectId === 0) && (userId || userId === 0)) {
        // Create new json with user data
        const newHomework = {
            id: homeworks.length,
            description,
            subjectId,
            userId
        };
        // Add homework to 'database'
        homeworks.push(newHomework);

        // Return data
        res.status(201).json({
            success: true,
            homework: newHomework
        });
    } else {
        // Return error message
        res.status(400).json({
            success: false,
            message: 'Required field(s) missing or invalid'
        });
    }
});

// Endpoint for updating homework specified by id
// PUT - homeworks
// Required: id
// Optional: description, dueDate, subjectId
// Returns:
//  Success: status 200 - OK and subject data in response body
//  Fail: status 400 - Bad Request and error message in response body
app.put('/api/homeworks', (req, res) => {
    // Next lines checking if provided data is expected type (typeof) and has length when whitespace is removed (.trim().length)
    const id = typeof(req.body.id) === 'number' ? req.body.id : false;
    const description = typeof(req.body.description) === 'string' && req.body.description.trim().length > 0 ? req.body.description : false;
    const dueDate = new Date();
    const subjectId = typeof(req.body.subjectId) === 'number' ? req.body.subjectId : false;
    // Check if required data exists
    if(id || id === 0) {
        // Check if optional data exists
        if (description) {
            // Change user data in 'database'
            homeworks[id].description = description;
        }
        // Check if optional data exists
        if ((subjectId || subjectId === 0)) {
            // Change user data in 'database'
            homeworks[id].subjectId = subjectId;
        }
        // Return updated user data
        res.status(200).json({
            success: true,
            homeworks: homeworks[id]
        });
    } else {
        // Return error message
        res.status(400).json({
            success: false,
            message: 'Required field(s) missing or invalid'
        });
    }
});

// Endpoint for deleting homework specified by id
// DELETE - homeworks
// Required: id
// Optional: none
// Returns:
//  Success: status 200 - OK and { success: true } message
//  Fail: status 400 - Bad Request and error message in response body
app.delete('/api/homeworks', (req, res) => {
    // Check if required data exists
    const id = typeof(req.body.id) === 'number' ? req.body.id : false;
    if(id || id === 0) {
        homeworks.splice(id, 1);
        // Return success message
        res.status(200).json({
            success: true
        });
    } else {
        // Return error message
        res.status(400).json({
            success: false,
            message: 'Required field(s) missing or invalid'
        });
    }
});

app.listen(3000, () => {
    console.log('Server running');
});