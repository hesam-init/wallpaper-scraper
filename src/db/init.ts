import { Categories } from "$/src/db/category.model.ts";

function initDb() {
	const Models = [Categories];

	Models.forEach((Model) => {
		Model.init();
	});
}

export default initDb;
