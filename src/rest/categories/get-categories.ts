import http from "$/src/helper/axios.ts";
import cheerio from "cheerio";
import { CategoriesListType } from "$/src/rest/categories/types.ts";
import { CategoryType } from "$/src/rest/categories/types.ts";
import { withLoader } from "$/src/helper/ora.ts";
import { Categories } from "$/src/db/categories.model.ts";

export async function getCategoriesList(): Promise<CategoriesListType> {
	const cachedCategoriesList = Categories.getAll();

	if (cachedCategoriesList.length > 0) {
		return cachedCategoriesList;
	}

	const data = await withLoader({
		start: "Fetching categories list",
		success: "Categories fetched",
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

	categoriesList.map((category) => {
		Categories.insert(category.name, category.url);
	});

	return categoriesList;
}
