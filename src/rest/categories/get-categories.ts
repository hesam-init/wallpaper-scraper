import http from "$/src/helper/axios.ts";
import cheerio from "cheerio";
import { CategoriesListType } from "$/src/rest/categories/types.ts";
import { CategoryType } from "$/src/rest/categories/types.ts";
import { withLoader } from "$/src/helper/ora.ts";
import Category from "$/src/db/category.model.ts";

export async function getCategoriesList(): Promise<CategoriesListType> {
	const categoriesList = Category.getAll();

	if (categoriesList.length > 0) {
		return categoriesList;
	}

	const data = await withLoader({
		start: "fetching categories list",
		success: "categories fetched",
	}, async () => {
		const { data } = await http.get("");
		return data;
	});

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

	categories.map((category) => {
		Category.insert(category.name, category.url);
	});

	return categories;
}
