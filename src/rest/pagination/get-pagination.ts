import http from "$/src/helper/axios.ts";
import cheerio from "cheerio";
import { withLoader } from "$/src/helper/ora.ts";

export async function getCategoriesPagination(
	category: string,
): Promise<string> {
	const data = await withLoader({
		start: "fetching totalpages",
		success: "total pages fetched",
	}, async () => {
		const { data } = await http.get(category);
		return data;
	});
	const $ = cheerio.load(data);

	const categoryPaginations = $(".pages");

	const totalCategoryPages = $(categoryPaginations).find("a:nth-child(5)")
		.text();

	return totalCategoryPages;
}
