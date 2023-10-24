import express from 'express';
import session from 'express-session';
import Routes from './routes/routes.js';

const app = express();
const port =  3000;


app.use(express.static("static"));
app.use(express.static("node_modules/bootstrap/dist"));
app.use(express.static("node_modules/@popperjs/core/dist/umd"));
app.use(express.static("node_modules/jquery/dist"));

app.set('view engine', 'ejs');

// Enable support for URL-encoded request bodies (form posts)
app.use(
    express.urlencoded({
        extended: true,
    })
);

// Express session middleware automatically manages a session cookie
// that is used to give persistent state between requests, making
// the application stateful and overcoming the stateless nature of HTTP.
app.use(
    session({
        secret: "secret phrase",
        resave: false,
        saveUninitialized: false,
        cookie: { secure: false },
    })
);


app.use("/", Routes);




app.listen(port, () => {
  console.log(`Server is running on  http://localhost:${port}`);
});
