import { selectCategory } from "$/src/rest/categories/select-category.ts";

async function main() {
	const selectedCategory = await selectCategory();

	console.log(selectedCategory);
}

main();
