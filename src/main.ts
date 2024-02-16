import { selectCategory } from "$/src/rest/categories/select-category.ts";
import { getCategoriesPagination } from "$/src/rest/pagination/get-pagination.ts";
import initDb from "$/src/db/init.ts";

initDb();

main();

async function main() {
	const selectedCategory = await selectCategory();
	const totalCategoryPage = await getCategoriesPagination(selectedCategory);

	console.log(`${totalCategoryPage} pages`);
}
