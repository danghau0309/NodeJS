function deleteItem(id) {
	fetch(`http://localhost:5000/api/data/${id}`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json"
		}
	})
		.then((res) => res.json())

		.catch((err) => console.error(err));
}
// const addToCart = (id) => {
// 	console.log(id);
// 	fetch(`http://localhost:5000/api/data/${id}`, {
// 		method: "POST",
// 		headers: {
// 			"Content-Type": "application/json",
// 			body: JSON.stringify()
// 		}
// 	});
// };
const apiCart = () => {
	fetch("http://localhost:5000/apiCart")
		.then((res) => res.json())
		.then((data) => console.log(data))
		.catch((err) => console.log(err));
};
apiCart();
