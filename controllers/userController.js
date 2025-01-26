const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');


exports.registerUser = async (req, res) => {
  try {
    const { user_name, email, phone, password, role, is_active } = req.body;
   

    const hashedPassword = await bcrypt.hash(password, 10);
    
    const newUser = await User.create({
      user_name,
      email,
      phone,
      password: hashedPassword,
      role,
      is_active
    });

    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (err) {
    res.status(500).json({ message: 'Error registering user', error: err.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const match = await bcrypt.compare(password, user.password);
    
    if (!match) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
    
    res.status(200).json({ message: 'Login successful', token });
  } catch (err) {
    res.status(500).json({ message: 'Error logging in', error: err.message });
  }
};


exports.getAllUsers = async (req, res) => {
  try {
      
     const users = await User.findAll();
    res.status(200).json({ users });
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving users', error: err.message });
  }
};


exports.getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.user_id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving user', error: err.message });
  }
};


exports.updateUser = async (req, res) => {
  try {
    const { user_name, email, phone, password, role, is_active } = req.body;
    
    const user = await User.findByPk(req.params.user_id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (password) {
      req.body.password = await bcrypt.hash(password, 10);
    }

    await user.update(req.body);
    res.status(200).json({ message: 'User updated successfully', user });
  } catch (err) {
    res.status(500).json({ message: 'Error updating user', error: err.message });
  }
};


exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.user_id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await user.destroy();
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting user', error: err.message });
  }
};
