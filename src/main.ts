import initDb from "$/src/db/init.ts";
import { selectCategory } from "$/src/rest/categories/select-category.ts";
import { selectTotalPage } from "$/src/rest/pagination/select-page.ts";
import { getWallpapers } from "$/src/rest/wallpapers/get-wallpapers.ts";
import { MESSAGE } from "$/src/constants/env.ts";

main();

async function main() {
	initDb();

	const selectedCategory = await selectCategory();
	const selectedTotalPage = await selectTotalPage(selectedCategory);

	await getWallpapers(selectedCategory, selectedTotalPage);
}

Deno.addSignalListener("SIGINT", () => {
	setTimeout(() => {
		console.clear();
		console.log(`\n${MESSAGE.EXIT}`);
		Deno.exit(0);
	}, 500);
});
