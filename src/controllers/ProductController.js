const Product = require("../models/product");
const Cart = require("../models/cart");
class ProductController {
	async productDetail(req, res, next) {
		const showDetail = await Product.findOne({ slug: req.params.slug });
		await Product.findOneAndUpdate({ slug: req.params.slug }, { $inc: { view: 1 } });
		res.render("showDetails/detail", { showDetail });
	}

	async showHome(req, res, next) {
		try {
			const products = await Product.find({});
			const bestSelling = await Product.find({ bestselling_Product: 1 });
			res.render("home", { products, bestSelling });
		} catch (error) {
			next(error);
		}
	}
	async addToCart(req, res, next) {
		try {
			const addProduct = await Product.findById(req.params.id);
			if (!addProduct) {
				return res.status(404).json({ message: "Product not found" });
			}
			const newCartItem = {
				name: addProduct.name,
				price: addProduct.price,
				image: addProduct.image,
				quantity: 1,
				total: addProduct.price,
				discount: addProduct.discount,
				bestselling_Product: addProduct.bestselling_Product
			};
			const cartItem = await Cart.create(newCartItem);
			res.render("cart");
		} catch (error) {
			next(error);
		}
	}
	async showCart(req, res, next) {
		const cartList = await Cart.find({});
		res.render("cart", { cartList });
	}
	async apiCart(req, res, next) {
		const apiCartList = await Cart.find({});
		res.json(apiCartList);
	}
}
module.exports = new ProductController();
