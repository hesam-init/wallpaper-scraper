import http from "$/src/helper/axios.ts";
import cheerio from "cheerio";
import { withLoader } from "$/src/helper/ora.ts";
import { Category } from "$/src/db/category.model.ts";

export async function getWallpapers(
	category: string,
	totalPage: number,
): Promise<any> {
	const selectedCategory = category.replaceAll("/", "");

	Category.init(selectedCategory);

	const data = await withLoader({
		start: "fetch wallpapers url",
		success: "wallpapers",
	}, async () => {
		const { data } = await http.get(category, {
			params: {
				page: 2,
			},
		});
		return data;
	});

	const $ = cheerio.load(data);

	const picsList = $("#pics-list p");

	picsList.each((idx, el) => {
		const pic = {
			title: $(el).find("a").attr("title"),
			url: $(el).find("a").attr("href"),
		};

		console.log(pic);
	});
}
