module.exports = {
	mutipleMongooseToObject: function (mongooese) {
		return mongooese.map((mongooese) => mongooese.toObject());
	},
	mongooeseToObject: function (mongooese) {
		return mongooese ? mongooese.toObject() : mongooese;
	}
};
