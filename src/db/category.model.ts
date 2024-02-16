import { DatabaseManager } from "$/src/db/db.ts";
import {
	CategoriesListType,
	CategoryType,
} from "$/src/rest/categories/types.ts";

export class Category {
	private static tableName = "categories";

	public static init() {
		const dbManager = DatabaseManager.getInstance();
		const db = dbManager.getDb();

		db.execute(
			`CREATE TABLE IF NOT EXISTS ${this.tableName} ( id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, url TEXT )`,
		);
	}

	public static insert(name: string, url: string) {
		const dbManager = DatabaseManager.getInstance();
		const db = dbManager.getDb();

		const insertQuery =
			`INSERT INTO ${this.tableName} (name, url) VALUES (?, ?)`;

		db.query(insertQuery, [name, url]);
	}

	public static getAll(): CategoriesListType {
		const dbManager = DatabaseManager.getInstance();
		const db = dbManager.getDb();

		const selectQuery = `SELECT name, url FROM ${this.tableName}`;

		const result: Array<string[]> = db.query(selectQuery);

		const categories: CategoryType[] = result.map(([name, url]) => ({
			name,
			url,
		}));

		return categories;
	}
}

export default Category;
