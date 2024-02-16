import initDb from "$/src/db/init.ts";
import { selectCategory } from "$/src/rest/categories/select-category.ts";
import { selectTotalPage } from "$/src/rest/pagination/select-page.ts";
import { getWallpapers } from "$/src/rest/wallpapers/get-wallpapers.ts";

Main();

async function Main() {
	initDb();

	const selectedCategory = await selectCategory();
	const selectedTotalPage = await selectTotalPage(selectedCategory);

	await getWallpapers(selectedCategory, selectedTotalPage);
}

Deno.addSignalListener("SIGINT", () => {
	setTimeout(() => {
		console.clear();
		console.log("Process Closed !");
		Deno.exit();
	}, 500);
});
