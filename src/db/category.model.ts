import { DatabaseManager } from "$/src/db/db.ts";
import {
	CategoriesListType,
	CategoryType,
} from "$/src/rest/categories/types.ts";

export class Categories {
	private static tableName = "categories";
	private static dbManager = DatabaseManager.getInstance();
	private static db = Categories.dbManager.getDb();

	public static init() {
		Categories.db.execute(
			`CREATE TABLE IF NOT EXISTS ${this.tableName} ( id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, url TEXT, totalPage INTEGER )`,
		);
	}

	public static insert(name: string, url: string) {
		const insertQuery =
			`INSERT INTO ${this.tableName} (name, url) VALUES (?, ?)`;

		this.db.query(insertQuery, [name, url]);
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

	public static getTotalPage(category: string): number {
		const selectQuery =
			`SELECT totalPage FROM ${this.tableName} WHERE url = ?`;

		const totalPage = this.db.query(selectQuery, [category])[0][0];

		return Number(totalPage);
	}

	public static updateTotalPage(category: string, totalPage: number) {
		const updateQuery =
			`UPDATE ${this.tableName} SET totalPage = ? WHERE url = ?`;

		this.db.query(updateQuery, [totalPage, category]);
	}
}
