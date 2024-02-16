import inquirer from "inquirer";
import { Categories } from "$/src/db/categories.model.ts";

export async function selectDownloadCategory(): Promise<string> {
	const categoriesList = Categories.getAllTables();

	const selectedCategory = await inquirer.prompt([{
		type: "list",
		name: "category",
		message: "Select an category:",
		choices: categoriesList,
	}]);

	return selectedCategory.category;
}
