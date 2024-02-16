import { selectCategory } from "$/src/rest/categories/select-category.ts";
import initDb from "$/src/db/init.ts";
import { selectTotalPage } from "$/src/rest/pagination/select-page.ts";

initDb();

main();

async function main() {
	const selectedCategory = await selectCategory();
	const selecttedTotalPage = await selectTotalPage(selectedCategory);

	console.log(selecttedTotalPage);
}
