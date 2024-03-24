const express = require("express");
const morgan = require("morgan");
const path = require("path");
const app = express();
const port = 5000;
const db = require("./config/db/connect");
const { engine } = require("express-handlebars");
const Handlebars = require("handlebars");
const { allowInsecurePrototypeAccess } = require("@handlebars/allow-prototype-access");
const methodOverride = require("method-override");
const route = require("./routes");
const session = require("express-session");

// setup session
app.use(
	session({
		secret: "keyboard cat",
		resave: false,
		saveUninitialized: true
	})
);
app.use((req, res, next) => {
	if (req.session.isLoggedIn) {
		res.locals.isLoggedIn = req.session.isLoggedIn;
	} else {
		req.session.isLoggedIn = false;
		res.locals.isLoggedIn = false;
	}
	next();
});

app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//Connect to db
db.connect();
app.use(express.static(path.join(__dirname, "public")));
app.use(morgan("dev"));
app.engine(
	".hbs",
	engine({ extname: ".hbs", handlebars: allowInsecurePrototypeAccess(Handlebars) })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "/views"));
route(app);
//Lab

app.listen(port, () => {
	console.log(`Example app listening on port http://localhost:${port}`);
});
