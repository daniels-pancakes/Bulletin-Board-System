// Compatibility and pathing for files
const path = require('path');
// HTTP API server requests
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');

// JavaScript comm w/ SQL (postgres)
const sequelize = require('./config/connection');

// Persist db
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create();

const sess = {
    secret: process.env.SESSION_SECRET,
    cookie: {
        maxAge: 60 * 60 * 1000,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

console.log('Current NODE_Env:', process.env.NODE_ENV);

app.use(session(sess));

// Templating construction of HTML
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// JSON parse
app.use(express.json());
// Passes to req.body
app.use(express.urlencoded({ extended: true }));
// Handles static files request by client from server
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);



sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Local http://localhost:${PORT} Web https://bulletin-board-system.onrender.com/`));
});