const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const { Resend } = require('resend');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose
  .connect(
    'mongodb+srv://sadneyasam05:root@cluster0.7gxwyxh.mongodb.net/?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Define User Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ['Student', 'Alumni', 'Organization','admin'], required: true },
  createdAt: { type: Date, default: Date.now },
});

// Create User Model
const User = mongoose.model('User', userSchema);

// API Routes
app.post('/api/users', async (req, res) => {
  const { name, email, role, creatorEmail } = req.body;

  if (!name || !email || !role) {
    return res.status(400).json({ message: 'All fields (name, email, role) are required' });
  }

  try {
    // Check if the creator is an admin
    const creator = await User.findOne({ email: creatorEmail });
    if (!creator || creator.role !== 'admin') {
      return res.status(403).json({ message: 'Only admins can create new users' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const newUser = new User({ name, email, role });
    await newUser.save();

    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
});


// Admin Schema
const AdminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

const Admin = mongoose.model("Admin", AdminSchema);

// 🔹 **Admin Login API** 🔹
app.post("/api/admin/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(400).json({ message: "Admin not found" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ email: admin.email, role: "admin" }, "secretkey", { expiresIn: "2h" });

    res.json({ message: "Admin login successful", token });

  } catch (error) {
    console.error("Error in /api/admin/login:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// 🔹 **Create Admin (Run Once Manually)** 🔹
app.post("/api/admin/register", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = new Admin({ email, password: hashedPassword });

    await admin.save();
    res.json({ message: "Admin registered successfully" });

  } catch (error) {
    console.error("Error in /api/admin/register:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.get('/api/users/:email', async (req, res) => {
  const { email } = req.params;

  try {
    const user = await User.findOne({ email });
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
});


// Define Event Schema
const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  meetingLink: { type: String, required: true }, // Online event link
  qrCode: { type: String } // Store generated QR code link
});

const Event = mongoose.model('Event', eventSchema);


app.post('/api/events', async (req, res) => {
  try {
    const { title, description, date, time } = req.body;

    if (!title || !description || !date || !time) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    // Generate a unique Meeting Link and QR Code link
    const uniqueQR = `http://localhost:3000/video_call/room/${crypto.randomBytes(5).toString('hex')}`;

    const newEvent = new Event({ title, description, date, time, meetingLink: uniqueQR, qrCode: uniqueQR });
    await newEvent.save();

    res.status(201).json({ message: "Event Created Successfully", event: newEvent });
  } catch (error) {
    res.status(500).json({ message: "Error creating event", error });
  }
});


// API to Fetch All Events
app.get('/api/events', async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: "Error fetching events", error });
  }
});


// newsletter
// Initialize Resend
const resend = new Resend('re_123456789');


// Define Newsletter Schema
const newsletterSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
});
const Newsletter = mongoose.model('Newsletter', newsletterSchema);

// API: Publish Newsletter (Only Alumni)
app.post('/api/newsletters', async (req, res) => {
  const { title, content, authorEmail } = req.body;

  try {
    const author = await User.findOne({ email: authorEmail });
    if (!author || author.role !== 'Alumni') {
      return res.status(403).json({ message: 'Only alumni can publish newsletters' });
    }

    const newNewsletter = new Newsletter({ title, content, author: author._id });
    await newNewsletter.save();

    // Fetch all user emails (Students, Alumni, Organizations)
    const users = await User.find();
    const emailList = users.map(user => user.email);

    if (emailList.length > 0) {
      await resend.emails.send({
        from: 'newsletter@yourdomain.com',
        to: emailList,
        subject: `New Alumni Newsletter: ${title}`,
        html: `<h2>${title}</h2><p>${content}</p><p>Published by: ${author.name}</p>`,
      });
    }

    res.status(201).json({ message: 'Newsletter published and all users notified!' });
  } catch (error) {
    res.status(500).json({ message: 'Error publishing newsletter', error });
  }
});

// API: Get All Newsletters
app.get('/api/newsletters', async (req, res) => {
  try {
    const newsletters = await Newsletter.find().populate('author', 'name email');
    res.json(newsletters);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching newsletters' });
  }
});

// Start Server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// mongodb+srv://sadneyasam05:root@cluster0.7gxwyxh.mongodb.net/?retryWrites=true&w=majority
