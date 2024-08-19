const router = require('express').Router();
// Import the User model from the models folder
const { User } = require('../../models');
const bcrypt = require('bcrypt');

// If a POST request is made to /api/users, a new user is created. The user id and logged in state is saved to the session within the request object.
router.post('/', async (req, res) => {
console.log(req.body);
  try {
    const userData = await User.findOne({ where: { user_name: req.body.user_name } });

    if (userData) {
        res.status(400).render('login', { message: 'Invalid username or password' });
        return;
    }

    const newUser = await User.create({
        user_name: req.body.user_name,
        password: req.body.password
  });

    req.session.save(() => {
      req.session.user_id = newUser.user_id;
      req.session.userLoggedIn = true;
      res.redirect('/dashboard');
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// If a POST request is made to /api/users/login, the function checks to see if the user information matches the information in the database and logs the user in. If correct, the user ID and logged-in state are saved to the session within the request object.
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { user_name: req.body.user_name } });

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
      req.session.user_id = userData.user_id;
      req.session.userLoggedIn = true;
      res.redirect('/dashboard');
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/dashboard', (req, res) => {
  if (req.session.userLoggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// If a POST request is made to /api/users/logout, the function checks the logged_in state in the request.session object and destroys that session if logged_in is true.
router.post('/logout', (req, res) => {
  if (req.session.userLoggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
