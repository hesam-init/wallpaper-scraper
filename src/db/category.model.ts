import { DatabaseManager } from "$/src/db/db.ts";
import {
	CategoriesListType,
	CategoryType,
} from "$/src/rest/categories/types.ts";

export class Category {
	private static tableName = "categories";
	private static dbManager = DatabaseManager.getInstance();
	private static db = Category.dbManager.getDb();

	public static init() {
		Category.db.execute(
			`CREATE TABLE IF NOT EXISTS ${this.tableName} ( id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, url TEXT, totalPage INTEGER )`,
		);
	}

	public static insert(name: string, url: string) {
		const insertQuery =
			`INSERT INTO ${this.tableName} (name, url) VALUES (?, ?)`;

		this.db.query(insertQuery, [name, url]);
	}

	public static insertTotalPage(category: string, totalPage: number) {
		const insertQuery =
			`INSERT INTO ${this.tableName} (name, totalPage) VALUES (?, ?)`;

		this.db.query(insertQuery, [category, totalPage]);
	}

	public static getAll(): CategoriesListType {
		const selectQuery = `SELECT name, url FROM ${this.tableName}`;

		const result: Array<string[]> = this.db.query(selectQuery);

		const categories: CategoryType[] = result.map(([name, url]) => ({
			name,
			url,
		}));

		return categories;
	}
}

export default Category;
