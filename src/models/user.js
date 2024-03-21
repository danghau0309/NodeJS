const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const users = new Schema(
	{
		id: ObjectId,
		username: { type: "string", unique: true },
		password: String,
		email: { type: "string", unique: true },
		role: { type: String, default: "Người dùng" }
	},
	{
		timestamps: true
	}
);
module.exports = mongoose.model("users", users);
