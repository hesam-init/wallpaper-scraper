import { DatabaseManager } from "$/src/db/db.ts";

export class Category {
	private static tableName = "categories";

	public static init() {
		const dbManager = DatabaseManager.getInstance();
		const db = dbManager.getDb();

		db.execute(`
      CREATE TABLE IF NOT EXISTS ${this.tableName} (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        url TEXT
      )
    `);
	}

	public static insert(name: string, url: string) {
		const dbManager = DatabaseManager.getInstance();
		const db = dbManager.getDb();

		const insertQuery =
			`INSERT INTO ${this.tableName} (name, url) VALUES (?, ?)`;

		db.query(insertQuery, [name, url]);

		return;
	}

	public static getAll(): Promise<
		{ id: number; name: string; url: string }[]
	> {
		const dbManager = DatabaseManager.getInstance();
		const db = dbManager.getDb();

		const selectQuery = `SELECT id, name, url FROM ${this.tableName}`;

		return db.query(selectQuery);
	}
}

export default Category;
