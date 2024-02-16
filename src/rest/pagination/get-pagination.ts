import http from "$/src/helper/axios.ts";
import cheerio from "cheerio";
import { withLoader } from "$/src/helper/ora.ts";
import { Categories } from "$/src/db/categories.model.ts";

export async function getCategoriesPagination(
	category: string,
): Promise<number> {
	const cachedTotalPages = Categories.getTotalPage(category);

	if (cachedTotalPages !== 0) {
		return cachedTotalPages;
	}

	const data = await withLoader({
		start: "Fetching totalpages",
		success: "Total pages fetched",
	}, async () => {
		const { data } = await http.get(category);
		return data;
	});
	const $ = cheerio.load(data);

	const categoryPaginations = $(".pages");

	const totalPages = $(categoryPaginations).find("a:nth-child(5)")
		.text();

	Categories.updateTotalPage(category, Number(totalPages));

	return Number(totalPages);
}
