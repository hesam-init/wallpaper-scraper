import { Categories } from "$/src/db/categories.model.ts";

function initDb() {
	const Models = [Categories];

	Models.forEach((Model) => {
		Model.init();
	});
}

export default initDb;
