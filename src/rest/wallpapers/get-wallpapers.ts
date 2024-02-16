import http from "$/src/helper/axios.ts";
import cheerio from "cheerio";
import { withLoader } from "$/src/helper/ora.ts";
import { Category } from "$/src/db/category.model.ts";

let currentPage = 1;

export async function getWallpapers(
	category: string,
	totalPage: number,
): Promise<unknown> {
	if (currentPage === totalPage) {
		Deno.exit();

		return null;
	}

	const selectedCategory = category.replaceAll("/", "");

	Category.init(selectedCategory);

	const data = await withLoader({
		start:
			`fetching ${selectedCategory} wallpapers url - page ${currentPage}`,
	}, async () => {
		const { data } = await http.get(category, {
			params: {
				page: currentPage,
			},
		});
		return data;
	});

	const $ = cheerio.load(data);

	const picsList = $("#pics-list p");

	picsList.each((idx, el) => {
		const pic = {
			title: $(el).find("a").attr("title") || "",
			url: $(el).find("a").attr("href") || "",
		};

		Category.insert(selectedCategory, pic.title, pic.url);
	});

	currentPage++;
	getWallpapers(category, totalPage);
}
