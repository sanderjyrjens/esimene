const users = [
    {
        id: 0,
        firstName: 'Juku',
        lastName: 'Juurikas',
        email: 'juku@juurikas.ee',
        password: 'juku'
    },
    {
        id: 1,
        firstName: 'Juhan',
        lastName: 'Juurikas',
        email: 'juhan@juurikas.ee',
        password: 'juhan'
    }
];
const usersController = {};

// Endpoint for getting list of available users
// GET - users
// Required values: none
// Optional values: none
// Returns: status 200 - OK and list of users in response body
usersController.read = (req, res) => {
        // Return list of users
        res.status(200).json({
            success: true,
            users: users
        });
    }

// Endpoint for getting user specified by id
// GET - users
// Required: id
// Optional: none
// Returns: status 200 - OK and user data in response body
usersController.readById = (req, res) => {
    // Return user with specified id
    res.status(200).json({
        success: true,
        user: users[req.params.id]
    });
};

// Endpoint for creating new user
// POST - users
// Required values: firstName, lastName, email, password
// Optionalvalues: none
// Returns:
//  Success: status 201 - Created and user data in response body
//  Fail: status 400 - Bad Request and error message in response body
usersController.create = (req, res) => {
    // Check if provided data is expected type (typeof) and has length when whitespace is removed (.trim().length)
    const firstName = typeof(req.body.firstName) === 'string' && req.body.firstName.trim().length > 0 ? req.body.firstName : false;
    const lastName = typeof(req.body.lastName) === 'string' && req.body.lastName.trim().length > 0 ? req.body.lastName : false;
    const email = typeof(req.body.email) === 'string' && req.body.email.trim().length > 0 ? req.body.email : false;
    const password = typeof(req.body.password) === 'string' && req.body.password.trim().length > 2 ? req.body.password : false;

    // Check if required data exists
    if (firstName && lastName && email && password) {
        // Create new json with user data
        const newUser = {
            id: users.length,
            firstName,
            lastName,
            email,
            password
        };
        // Add user to 'database'
        users.push(newUser);

        // Create new json from newUser for response
        const userToReturn = { ... newUser };
        // Remove password from user data
        delete userToReturn.password;

        // Return data
        res.status(201).json({
            success: true,
            user: userToReturn
        });
    } else {
        // Return error message
        res.status(400).json({
            success: false,
            message: 'Required field(s) missing or invalid'
        });
    }
};

// Endpoint for updating user specified by id
// PUT - users
// Required: id
// Optional: firstName, lastName, email, password
// Returns:
//  Success: status 200 - OK and user data in response body
//  Fail: status 400 - Bad Request and error message in response body
usersController.update = (req, res) => {
    // Next lines checking if provided data is expected type (typeof) and has length when whitespace is removed (.trim().length)
    // Ternary operator: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator
    const id = typeof(req.body.id) === 'number' ? req.body.id : false;
    /* Same as:
    let id;
     if (typeof(req.body.id) === 'number') {
        id = req.body.id
     } else {
         id = false;
     }
     */
    const firstName = typeof(req.body.firstName) === 'string' && req.body.firstName.trim().length > 0 ? req.body.firstName : false;
    const lastName = typeof(req.body.lastName) === 'string' && req.body.lastName.trim().length > 0 ? req.body.lastName : false;
    const email = typeof(req.body.email) === 'string' && req.body.email.trim().length > 0 ? req.body.email : false;
    const password = typeof(req.body.password) === 'string' && req.body.password.trim().length > 3 ? req.body.password : false;
    // Check if required data exists
    if(id || id === 0) {
        // Check if optional data exists
        if (firstName) {
            // Change user data in 'database'
            users[id].firstName = firstName;
        }
        // Check if optional data exists
        if (lastName) {
            // Change user data in 'database'
            users[id].lastName = lastName;
        }
        // Check if optional data exists
        if (email) {
            // Change user data in 'database'
            users[id].email = email;
        }
        // Check if optional data exists
        if (password) {
            // Change user data in 'database'
            users[id].password = password;
        }
        // Return updated user data
        res.status(200).json({
            success: true,
            user: users[id]
        });
    } else {
        // Return error message
        res.status(400).json({
            success: false,
            message: 'Required field(s) missing or invalid'
        });
    }
};

// Endpoint for deleting user specified by id
// DELETE - users
// Required: id
// Optional: none
// Returns:
//  Success: status 200 - OK and { success: true } message
//  Fail: status 400 - Bad Request and error message in response body
usersController.delete = (req, res) => {
    // Check if required data exists
    const id = typeof(req.body.id) === 'number' ? req.body.id : false;
    if(id || id === 0) {
        users.splice(id, 1);
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
};

module.exports = usersController;



