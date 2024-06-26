const User = require("../models/user");
const bcrypt = require("bcrypt");
class AuthController {
	renderLogin(req, res) {
		res.render("auth/login");
	}
	async login(req, res) {
		try {
			const user = await User.findOne({
				username: req.body.username,
				password: req.body.password
			});
			const { username, password } = req.body;
			if (user) {
				req.session.isLoggedIn = true;
				req.session.username = user.username;

				req.session.save((err) => {
					if (err) {
						console.error(err);
					}
					res.status(200).redirect("/");
				});
			} else if (!username || !password) {
				res.status(403).send("Invalid username or password");
			} else {
				res.status(500).send("User not found");
			}
		} catch (err) {
			res.status(400).send("Error ...");
		}
	}

	// GET auth/signup
	signup(req, res) {
		res.render("auth/signup");
	}
	//POST auth/signup/addUser
	async addUser(req, res, next) {
		try {
			const { username, password, email } = req.body;
			if (!username || !password || !email) {
				return res.status(400).json({ message: "Invalid username, password, or email." });
			}
			if (password.length < 8) {
				return res.status(400).json({ message: "Password is Maximum 8 charecters " });
			}

			const newUser = new User({ username, password, email });
			await newUser.save();
			return res.status(200).json({ message: "User created successfully." });
		} catch (error) {
			console.error("Error:", error);
			return res.status(500).json({ message: error.message });
		}
	}
	logout(req, res, next) {
		req.session.destroy((err) => {
			res.redirect("/");
		});
	}
}
module.exports = new AuthController();
