import Category from "$/src/db/category.model.ts";

function initDb() {
	const Models = [Category];

	Models.forEach((Model) => {
		Model.init();
	});
}

export default initDb;
