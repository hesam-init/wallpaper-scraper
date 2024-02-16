import { selectCategory } from "$/src/rest/categories/select-category.ts";
import initDb from "$/src/db/init.ts";
import { selectTotalPage } from "$/src/rest/pagination/select-page.ts";
import { getWallpapers } from "$/src/rest/wallpapers/get-wallpapers.ts";

initDb();

main();

async function main() {
	const selectedCategory = await selectCategory();
	const selectedTotalPage = await selectTotalPage(selectedCategory);

	await getWallpapers(selectedCategory, selectedTotalPage);
}
