import http from "$/src/helper/axios.ts";
import cheerio from "cheerio";
import { CategoriesListType } from "$/src/rest/categories/types.ts";
import { CategoryType } from "$/src/rest/categories/types.ts";

export async function getCategoriesList() {
	const { data } = await http.get("");
	const $ = cheerio.load(data);

	const categoriesItems = $(".section-dropdown a");

	const categories: CategoriesListType = [];

	categoriesItems.each((idx, el) => {
		const category: CategoryType = {
			name: $(el).attr("title") || "",
			url: $(el).attr("href") || "",
		};

		categories.push(category);
	});

	return categories;
}
