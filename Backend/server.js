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

const ProfileSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  firstname: String,
  lastname: String,
  role: String,
  batch: String,
  department: String,
  avatar: String,
  resume: String,
  achievements: [
    {
      title: String,
      description: String,
      icon: String
    }
  ],
  stats: {
    eventsAttended: Number,
    internshipsCompleted: Number,
    projectsCompleted: Number,
    connectionsCount: Number
  },
  activities: [
    {
        type: { type: String, required: true },
        title: { type: String, required: true },
        date: { type: String, required: true },
        points: { type: Number, required: true }
    }
]
});

const Profile = mongoose.model("Profile", ProfileSchema);


// ✅ Create a new profile using email
app.post("/api/profile", async (req, res) => {
  try {
    console.log("Received data:", req.body);
    const newProfile = new Profile(req.body);
    await newProfile.save();
    res.status(201).json({ message: "Profile created successfully", profile: newProfile });
  } catch (error) {
    console.error("Error creating profile:", error);
    res.status(500).json({ error: "Error creating profile" });
  }
});

// ✅ Get a profile by email
app.get("/api/profile/:email", async (req, res) => {
  try {
    const profile = await Profile.findOne({ email: req.params.email });
    if (!profile) return res.status(404).json({ message: "Profile not found" });
    res.json(profile);
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ error: "Error fetching profile" });
  }
});

// ✅ Update profile data by email
app.put("/api/profile/:email", async (req, res) => {
  try {
    const updatedProfile = await Profile.findOneAndUpdate(
      { email: req.params.email },
      { $set: req.body },
      { new: true }
    );
    if (!updatedProfile) return res.status(404).json({ message: "Profile not found" });
    res.json({ message: "Profile updated successfully", profile: updatedProfile });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ error: "Error updating profile" });
  }
});

// const multer = require("multer");
// const path = require("path");

// // Configure Multer for resume upload
// const storage = multer.diskStorage({
//     destination: "./uploads/resumes/",
//     filename: (req, file, cb) => {
//         cb(null, `${req.body.email}-${Date.now()}${path.extname(file.originalname)}`);
//     }
// });
// const upload = multer({ storage });

// // Resume Upload API
// app.post("/api/profile/upload-resume", upload.single("resume"), async (req, res) => {
//     try {
//         const profile = await Profile.findOneAndUpdate(
//             { email: req.body.email },
//             { $set: { resume: `/uploads/resumes/${req.file.filename}` } },
//             { new: true }
//         );
//         if (!profile) return res.status(404).json({ message: "Profile not found" });
//         res.json({ message: "Resume uploaded successfully", resumeUrl: profile.resume });
//     } catch (error) {
//         console.error("Error uploading resume:", error);
//         res.status(500).json({ error: "Error uploading resume" });
//     }
// });


// ✅ Set up storage for resumes
const storage = multer.diskStorage({
  destination: "./resume", // Save resumes in the 'resume' folder
  filename: (req, file, cb) => {
    cb(null, `${req.params.email}_${Date.now()}${path.extname(file.originalname)}`);
  }
});

const upload = multer({ storage });

// ✅ Resume Upload & Profile Extraction API
app.post("/api/profile/:email/upload-resume", upload.single("resume"), async (req, res) => {
  try {
    const resumePath = req.file.path;
    const dataBuffer = await fs.readFile(resumePath);
    const pdfData = await pdfParse(dataBuffer);

    const extractedText = pdfData.text;
    
    // ✅ Extract user details using Regex or NLP (basic parsing)
    const firstname = extractedText.match(/Name[:\s]+(\w+)/i)?.[1] || "Unknown";
    const lastname = extractedText.match(/Name[:\s]+\w+\s(\w+)/i)?.[1] || "Unknown";
    const role = extractedText.match(/Role[:\s]+([\w\s]+)/i)?.[1] || "Student";
    const department = extractedText.match(/Department[:\s]+([\w\s]+)/i)?.[1] || "General";
    const batch = extractedText.match(/Batch[:\s]+(\d+)/i)?.[1] || "2024";

    // ✅ Extract achievements, activities, internships, and skills (basic detection)
    const achievements = extractedText.includes("Award") ? [{ title: "Award Winner", description: "Mentioned in Resume", icon: "award" }] : [];
    const internships = extractedText.includes("Intern") ? [{ title: "Internship Experience", description: "As mentioned in resume", icon: "briefcase" }] : [];
    const projects = extractedText.includes("Project") ? 1 : 0;

    // ✅ Update Profile in MongoDB
    const profile = await Profile.findOneAndUpdate(
      { email: req.params.email },
      {
        firstname,
        lastname,
        role,
        department,
        batch,
        resume: `/resume/${req.file.filename}`, // Store resume path
        achievements,
        stats: { eventsAttended: 2, internshipsCompleted: internships.length, projectsCompleted: projects, connectionsCount: 10 },
        activities: [{ type: "workshop", title: "Workshop Attended", date: new Date().toISOString(), points: 20 }]
      },
      { new: true, upsert: true }
    );

    res.json({ message: "Resume uploaded & profile updated!", profile });
  } catch (error) {
    console.error("Error processing resume:", error);
    res.status(500).json({ error: "Failed to process resume" });
  }
});

// Start Server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// mongodb+srv://sadneyasam05:root@cluster0.7gxwyxh.mongodb.net/?retryWrites=true&w=majority
