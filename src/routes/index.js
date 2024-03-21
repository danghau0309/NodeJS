const Product = require("./Product");
const auth = require("./auth");
const admin = require("./admin");
const api = require("./api/api");
const route = (app) => {
	app.use("/auth", auth);
	app.use("/admin", admin);
	app.use("/api", api);
	app.use("/", Product);
};
module.exports = route;
