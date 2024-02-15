import { getCategoriesList } from "$/src/rest/categories/get-categories.ts";
import inquirer from "inquirer";

export async function selectCategory(): Promise<string> {
	const categoriesList = await getCategoriesList();

	const categoriesListSelect = [
		{
			type: "list",
			name: "category",
			message: "Select an category:",
			choices: categoriesList.map((item) => ({
				name: item.name,
				value: item.url,
			})),
		},
	];

	const selectedCategory = await inquirer.prompt(categoriesListSelect);

	return selectedCategory.category;
}
