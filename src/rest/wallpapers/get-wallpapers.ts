import http from "$/src/helper/axios.ts";
import cheerio from "cheerio";
import { CategoriesListType } from "$/src/rest/categories/types.ts";
import { CategoryType } from "$/src/rest/categories/types.ts";
import { withLoader } from "$/src/helper/ora.ts";

export async function getWallpapers(): Promise<any> {
	const data = await withLoader({
		start: "fetch wallpapers url",
		success: "wallpapers",
	}, async () => {
		const { data } = await http.get("");
		return data;
	});

	const $ = cheerio.load(data);

	const categoriesItems = $(".section-dropdown a");

	const categoriesList: CategoriesListType = [];

	categoriesItems.each((idx, el) => {
		const category: CategoryType = {
			name: $(el).attr("title") || "",
			url: $(el).attr("href") || "",
		};

		categoriesList.push(category);
	});

	return categoriesList;
}
