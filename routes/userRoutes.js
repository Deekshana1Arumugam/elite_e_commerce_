const express = require('express');
const { signUpUser, loginUser, getAllUsers, getUserById, updateUser, deleteUser } = require('../controllers/userController');
const { verifyToken, authorizeRoles } = require('../middleware/authMiddleware');
const router = express.Router();

// Register a user
router.post('/register', signUpUser);

// Login a user
router.post('/login', loginUser);

// Get all users (only accessible by admin)
router.get('/getAll', verifyToken, authorizeRoles(['admin']), getAllUsers);

// Get a user by ID
router.get('/:user_id', verifyToken, getUserById);

// Update a user
router.put('/:user_id', verifyToken, authorizeRoles(['admin']), updateUser);

// Delete a user
router.delete('/:user_id', verifyToken, authorizeRoles(['admin']), deleteUser);

module.exports = router;
