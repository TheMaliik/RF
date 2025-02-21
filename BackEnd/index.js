const express = require("express");
const cors = require("cors");
const UserModel = require("./model"); // Ensure this path is correct
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");

const port = 5000; // Directly specify the port
const app = express();
app.use(express.json());
app.use(cors({ origin: '*' }));

// Use 127.0.0.1 to avoid IPv6 issues
const dbURI = 'mongodb://127.0.0.1:27017/yourdbname'; // Replace 'yourdbname' with your actual database name

mongoose.connect(dbURI)
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error('MongoDB connection error:', err));

// Set up Multer storage configuration
const storage = multer.diskStorage({
destination: (req, file, cb) => {
cb(null, 'uploads/'); // Specify the directory to save uploaded files
},
filename: (req, file, cb) => {
cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to file name
}
});

app.use('/uploads', express.static('uploads'));

// Initialize Multer
const upload = multer({ storage: storage });

// User registration endpoint
app.post("/register", upload.single('picture'), async (req, res) => {
try {
const user = await UserModel.create({
id: req.body.id,
name: req.body.name,
email: req.body.email,
type: req.body.type,
picture:`http://localhost:${port}/${req.file.path}`, // Adjust URL to match your server
});
res.status(201).json(user);
} catch (e) {
res.status(400).json({ error: e.message });
}
});

// Get all users
app.get("/getUsers", async (req, res) => {
try {
const allData = await UserModel.find();
res.json(allData);
} catch (err) {
res.status(500).json({ message: err.message });
}
});

app.get('/getUserByEmail', async (req, res) => {
const email = req.query.email;
try {
const users = await UserModel.find({ email });
if (users.length > 0) {
return res.json(users); // Return all users with that email
} else {
return res.status(404).json({ message: 'User not found' });
}
} catch (error) {
console.error('Error fetching users:', error); // Log the error
res.status(500).json({ message: 'Error fetching users', error: error.message }); // Send detailed error message
}
});

// Start the server
app.listen(port, () => {
console.log(`Server is running on port ${port}`);
});