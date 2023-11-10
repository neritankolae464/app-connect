/*
Filename: ComplexCode.js

This code demonstrates a sophisticated and elaborate implementation of a chat application with realtime messaging, user authentication, and data storage using JavaScript, Node.js, and MongoDB.

Note: This code requires installing the required dependencies using npm and setting up a MongoDB database.

*/

// Import required modules
const express = require('express');
const socketIO = require('socket.io');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Create Express app
const app = express();

// Socket.IO configuration
const server = require('http').Server(app);
const io = socketIO(server);

// Set database URL
const dbURL = 'mongodb://localhost:27017/chatApp';

// Connect to MongoDB
mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to database'))
  .catch(error => console.error('Error connecting to database:', error));

// Define User schema
const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: String,
});

// Define Message schema
const MessageSchema = new mongoose.Schema({
  content: String,
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  timestamp: { type: Date, default: Date.now },
});

// Create User model
const User = mongoose.model('User', UserSchema);

// Create Message model
const Message = mongoose.model('Message', MessageSchema);

// Configure middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Register User
app.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();
    res.status(200).json({ message: 'Registration successful' });
  } catch (error) {
    res.status(500).json({ error: 'Error registering user' });
  }
});

// Authenticate User
app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: 'Authentication failed' });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Authentication failed' });
    }
    const token = jwt.sign(
      { userId: user._id, username: user.username },
      'secret_key',
      { expiresIn: '1h' }
    );
    res.status(200).json({ token, expiresIn: 3600 });
  } catch (error) {
    res.status(500).json({ error: 'Error authenticating user' });
  }
});

// Get all messages
app.get('/messages', async (req, res) => {
  try {
    const messages = await Message.find().populate('sender', 'username');
    res.status(200).json({ messages });
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving messages' });
  }
});

// Save new message
app.post('/messages', async (req, res) => {
  try {
    const { content, sender } = req.body;
    const message = new Message({ content, sender });
    await message.save();
    io.emit('newMessage', message);
    res.status(200).json({ message: 'Message sent' });
  } catch (error) {
    res.status(500).json({ error: 'Error sending message' });
  }
});

// Start server and listen for socket connections
server.listen(3000, () => {
  console.log('Server started on port 3000');
});

// Socket.IO connection and events
io.on('connection', (socket) => {
  socket.on('join', (userId) => {
    socket.join(userId);
  });

  socket.on('leave', (userId) => {
    socket.leave(userId);
  });

  socket.on('disconnect', () => {
    // Perform necessary cleanup
  });
});

/*
  Additional functions, modules, and express routes can be added to this code to further enhance the functionality, 
  such as private messaging, user profile editing, or deleting messages. However, this code provides a solid foundation 
  for a complex chat application.
*/
