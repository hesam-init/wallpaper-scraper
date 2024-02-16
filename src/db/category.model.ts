import { DatabaseManager } from "$/src/db/db.ts";

export class Category {
	private static tableName = "category";
	private static dbManager = DatabaseManager.getInstance();
	private static db = Category.dbManager.getDb();

	public static init(category: string) {
		Category.db.execute(
			`CREATE TABLE IF NOT EXISTS "${this.tableName}_${category}" ( id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, url TEXT )`,
		);
	}

	public static insert(category: string, title: string, url: string) {
		const existingRow = this.db.query(
			`SELECT * FROM "${this.tableName}_${category}" WHERE url = ?`,
			[url],
		);

		if (existingRow.length === 0) {
			const insertQuery =
				`INSERT INTO "${this.tableName}_${category}" (title, url) VALUES (?, ?)`;
			this.db.query(insertQuery, [title, url]);
		} else {
			console.log(`${title} exist in ${category}`);
		}
	}

	public static getAllImages(category: string) {
		const selectQuery = `SELECT * FROM "${category}"`;

		const result: Array<string[]> = this.db.query(selectQuery);

		const imagesList = result.reduce(
			(result, value) => {
				result.push({
					name: value[1],
					url: value[2],
				});

				return result;
			},
			[] as Array<{ name: string; url: string }>,
		);

		return imagesList;
	}
}
