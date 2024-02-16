import { DatabaseManager } from "$/src/db/db.ts";
import Category from "$/src/db/category.model.ts";

async function initDb(): Promise<void> {
	await Category.init();
}

export default initDb;
