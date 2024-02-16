import { DB } from "sqlite";
import { ENV } from "$/src/constants/env.ts";

export class DatabaseManager {
	private static instance: DatabaseManager;
	private db: DB;

	private constructor() {
		this.db = new DB(ENV.DB_FILE);
	}

	public static getInstance(): DatabaseManager {
		if (!DatabaseManager.instance) {
			DatabaseManager.instance = new DatabaseManager();
		}

		return DatabaseManager.instance;
	}

	public getDb(): DB {
		return this.db;
	}
}
