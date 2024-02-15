import http from "$/src/helper/axios.ts";
import cheerio from "cheerio";

export async function getCategoriesPagination(
	category: string,
): Promise<string> {
	const { data } = await http.get(category);
	const $ = cheerio.load(data);

	const categoryPaginations = $(".pages");

	const totalCategoryPages = $(categoryPaginations).find("a:nth-child(5)")
		.text();

	return totalCategoryPages;
}
