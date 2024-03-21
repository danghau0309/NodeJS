const express = require("express");
const morgan = require("morgan");
const path = require("path");
const app = express();
const port = 5000;
const db = require("./config/db/connect");
const route = require("./routes");
const { engine } = require("express-handlebars");
const Handlebars = require("handlebars");
const { allowInsecurePrototypeAccess } = require("@handlebars/allow-prototype-access");
const methodOverride = require("method-override");
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
app.get("/", (req, res) => {
	res.send("<h1>Đây là trang chủ</h1>");
});
app.get("/add-product", (req, res) => {
	res.send(`<form>
	<input type='text' name='productName'/>
	<button type='submit'>Add Product</button>
	</form>`);
});
const inventors = [
	{ id: 1, first: "Albert", last: "Einstein", year: 1879, passed: 1955 },
	{ id: 2, first: "Isaac", last: "Newton", year: 1643, passed: 1727 },
	{ id: 3, first: "Galileo", last: "Galilei", year: 1564, passed: 1642 },
	{ id: 4, first: "Marie", last: "Curie", year: 1867, passed: 1934 },
	{ id: 5, first: "Johannes", last: "Kepler", year: 1571, passed: 1630 },
	{ id: 6, first: "Nicolaus", last: "Copernicus", year: 1473, passed: 1543 }
];
app.get("/inventors", (req, res) => {
	let list = "<h2>Danh sách nhà khoa học</h2><ul>";
	inventors.forEach((e) => {
		list += `<li><a style="text-decoration:none;color:green;" href="/inventor/${e.id}">${e.last}</a></li>`;
	});
	list += "</ul>";
	res.send(list);
});

app.get("/inventor/:id", (req, res) => {
	let id = req.params.id;
	let inventor = inventors.find((e) => e.id == id);

	console.log(inventor.first.toLocaleUpperCase());
	info = `
    <button><a href='/inventors'>Quay lại</a></button>
    <h2>Thông tin chi tiết nhà khoa học:</h2>
    <h2>Full name:</h2>
    <h2>${inventor.first.toLocaleUpperCase()} ${inventor.last.toLocaleUpperCase()}</h2>
    <h2>Year: ${inventor.year}</h2>
    <h2> Passed: ${inventor.passed}</h2>
    `;
	res.send(info);
});

app.get("/add-inventor", (req, res) => {
	const inforProduct = inventors.map((product) => {
		({ id, first, last, year, passed } = product);
		return `
					<table border='1'  style="width='500px' display='inline-block'">
							
							<tr>
								<td  width='100px'>${id}</td>
								<td  width='100px'>${first}</td>
								<td  width='100px'>${last}</td>
								<td  width='100px'>${year}</td>
								<td  width='100px'>${passed}</td>
							</tr>
					</table>
		`;
	});
	res.send(
		`
			<h1>Thêm Nhà Khoa Học</h1>
			<form action='/inventor' method='post'>
			<p> <input type='text' name='first' placeholder='First name'></p>
			<p> <input type='text' name='last' placeholder='Last name'></p>
			<p> <input type='number' name='year' placeholder='Birth year '> </p>
			<p> <input type='number' name='passed' placeholder='Passed year'> </p>
			<p> <button type='submit'>Add Inventor</button> </p>
			</form>` + inforProduct.join("\n")
	);
});
app.post("/inventor", (req, res) => {
	let newInventor = req.body;
	newInventor.id = inventors.length + 1;
	inventors.push(newInventor);
	res.redirect("/add-inventor");
});
// Lab 2 :
app.get("/home", (req, res) => {
	var today = new Date();
	currentDay = today.getDay();
	var day = "";

	switch (currentDay) {
		case 0:
			day = "Chủ nhật";
			break;
		case 1:
			day = "Thứ hai";
			break;
		case 2:
			day = "Thứ ba";
			break;
		case 3:
			day = "Thứ tư";
			break;
		case 4:
			day = "Thứ năm";
			break;
		case 5:
			day = "Thứ sáu";
			break;
		case 6:
			day = "Thứ bảy";
			break;
		default:
			console.log(`Error: ${currentDay}`);
	}
	res.json(day);
});
app.listen(port, () => {
	console.log(`Example app listening on port http://localhost:${port}`);
});
