const router = require('express').Router();
// Import the User model from the models folder
const { User } = require('../../models');
const { Post } = require('../../models');
const bcrypt = require('bcrypt');

// If a POST request is made to /api/users, a new user is created. The user id and logged in state is saved to the session within the request object.
router.post('/signup', async (req, res) => {
console.log('Server received: ', req.body); // is returning the following { user_name: '', password: '' }
  try {
    const newUser = await User.create(req.body);
    req.session.save(() => {
      req.session.user_id = newUser.user_id;
      req.session.userLoggedIn = true;
      console.log('User succesfully created. Redirecting.');
      res.redirect('/dashboard');
    });
  } catch (err) {
    console.error('Error during signup', err);
    res.status(400).json(err);
  }
});

// If a POST request is made to /api/users/login, the function checks to see if the user information matches the information in the database and logs the user in. If correct, the user ID and logged-in state are saved to the session within the request object.
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { user_name: req.body.user_name } });
    console.log('Login endpoint located User.');

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }
    const validPassword = await bcrypt.compare(req.body.password, userData.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      console.log(`${userData.user_name} Session created.`);
      req.session.user_id = userData.user_id;
      req.session.userLoggedIn = true;
      res.redirect('/dashboard');
    });

  } catch (err) {
    console.error(`Error during login ${err}`);
    res.status(400).json(err);
  }
});

router.post('/create-post', async (req, res) => {
  if (req.session.userLoggedIn) {
    try {
      const createPost = await Post.create({subject: req.body.subject, body: req.body.body, poster: req.session.user_id, board_src: 1});
      res.redirect('/dashboard');
    } catch (err) {
      console.error(`Error during post creation ${err}`);
      res.status(400).json(err);
    }
  } else {
    res.status(404).end();
  }
});

// If a POST request is made to /api/users/logout, the function checks the logged_in state in the request.session object and destroys that session if logged_in is true.
router.post('/logout', (req, res) => {
  if (req.session.userLoggedIn) {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to log out.'});
      }
      res.redirect('/'); // fyi redirect is just built different, relative path is based on the web application
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
