const express = require('express');
const { registerUser, loginUser, getAllUsers, getUserById, updateUser, deleteUser } = require('../controllers/userController');
const { verifyToken, authorizeRoles } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/register', registerUser);

router.post('/login', loginUser);

router.get('/getAll', verifyToken, authorizeRoles(['admin']), getAllUsers);

router.get('/:user_id', verifyToken, getUserById);

router.put('/:user_id', verifyToken, authorizeRoles(['admin']), updateUser);

router.delete('/:user_id', verifyToken, authorizeRoles(['admin']), deleteUser);

module.exports = router;
