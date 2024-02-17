import { selectDownloadCategory } from "$/src/rest/downloader/select-download.ts";
import { Category } from "$/src/db/category.model.ts";
import { downloadFile } from "$/src/helper/down.ts";
import { MESSAGE } from "$/src/constants/env.ts";

downloadWallpapers();

async function downloadWallpapers() {
	const selectedCategory = await selectDownloadCategory();
	const imagesList = Category.getAllImages(selectedCategory);

	for (let i = 0; i < imagesList.length; i++) {
		await downloadFile(imagesList[i].url);
	}
}

Deno.addSignalListener("SIGINT", () => {
	setTimeout(() => {
		console.clear();
		console.log(`\n${MESSAGE.EXIT}`);
		Deno.exit(0);
	}, 500);
});
