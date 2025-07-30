import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import bodyParser from 'body-parser';
import { connectDB, collection } from '../src/db/db.js';
import { connectChat, chatCollection } from '../src/db/chats.js';
import { connectTitle, titleCollection } from '../src/db/titles.js';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcrypt';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

connectDB();
connectChat();
connectTitle();

const app = express();
const PORT = process.env.PORT;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../src/views'));
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

import pageRoutes from '../src/routes/pages.js';
import { title } from 'process';

app.post('/signup', async (req, res) => {
  const data = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  }
  const existingMail = await collection.findOne({ email: data.email });
  if (existingMail) {
    return res.send('Email already exists');
  }
  else
  {
    const saltRounds=10;
    const hashedPassword = await bcrypt.hash(data.password, saltRounds);
    data.password = hashedPassword;
    const userdata = await collection.insertMany(data);
    res.redirect('/chatApp');
  }
});

app.post('/login', async (req, res) => {
  const check = await collection.findOne({ email: req.body.email });
  if(!check)
  {
    res.send('User not found');
  }
  const isMatch = await bcrypt.compare(req.body.password, check.password);
  if(isMatch)
  {
    res.redirect('/chatApp');
  }
  else
  {
    res.send('Invalid credentials');
  }
});

app.post('/title', async (req, res) => {
  const title = req.body.title;
  const existingTitle = await titleCollection.findOne({ title: title });
  if (existingTitle) {
    return res.send('Title already exists');
  }
  const titleData = {
    title: title,
  }
  await titleCollection.insertMany(titleData);
  res.redirect('/chatApp');
});

app.post('/api/send', async (req, res) => {
  const userMessage = req.body.userMessage;
  const chatBotApi = process.env.CHATBOT_API_KEY;
  const response = await fetch(chatBotApi, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message: userMessage })
  });
  const chatBotResponse = await response.json();
  chatCollection.insertMany({
    title: req.body.title,
    userMessage: userMessage,
    botMessage: `${chatBotResponse.response}`,
    timestamp: new Date()
  });
  res.redirect('/chatApp');
});

app.get('/api/responses', async (req, res) => {
  const chats = await chatCollection.find({});
  if(chats.length != 0) {
    res.json(chats);
  }
});

app.get('/api/previousChats', async (req, res) => {
  const titles = await titleCollection.find({});
  if(titles.length != 0) {
    res.json(titles);
  }
});

app.use('/', pageRoutes);
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;