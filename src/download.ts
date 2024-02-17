import { selectDownloadCategory } from "$/src/rest/downloader/select-download.ts";
import { Category } from "$/src/db/category.model.ts";
import { downloadFile } from "$/src/helper/down.ts";

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
		console.log("\n Process Closed !");
		Deno.exit();
	}, 500);
});
