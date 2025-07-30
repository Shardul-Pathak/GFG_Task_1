import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
  res.render('index');
});

router.get('/home', (req, res) => {
  res.render('index');
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/signup', (req, res) => {
  res.render('signup');
});

router.get('/chatApp', (req, res) => {
  res.render('chatApp');
});

router.get('/title', (req, res) => {
  res.render('title');
});

export default router;


