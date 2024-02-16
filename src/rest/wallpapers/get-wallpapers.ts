import http from "$/src/helper/axios.ts";
import cheerio from "cheerio";
import { withLoader } from "$/src/helper/ora.ts";
import { Category } from "$/src/db/category.model.ts";
import { IMAGE } from "$/src/constants/preset.ts";
import { ENV } from "$/src/constants/env.ts";
import { QUALITY } from "$/src/constants/preset.ts";

let currentPage = 1;

function addQualityToName(url: string, qualityValue: string) {
	const name = String(
		url.split("/").pop()
			?.replace(
				".html",
				IMAGE.FORMAT,
			),
	);

	const lastDashIndex = name.lastIndexOf("-");

	if (lastDashIndex !== -1) {
		const mainName = name.slice(0, lastDashIndex);
		const numberAndExtension = name.slice(lastDashIndex + 1);

		return `${mainName}-${qualityValue}-${numberAndExtension}`;
	}

	return name;
}

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
			`Fetching ${selectedCategory} wallpapers url - page ${currentPage}`,
		success: `Page ${currentPage} - done !`,
		failed: `Failed to fetch data !`,
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
		const url = String($(el).find("a").attr("href")) || "";

		const withQuality = addQualityToName(url, QUALITY.FULL_HD);

		const imageUrl = `${ENV.DOWNLOAD_URL}${withQuality}`;

		const pic = {
			title: $(el).find("a").attr("title") || "",
			url: imageUrl || "",
		};

		Category.insert(selectedCategory, pic.title, pic.url);
	});

	currentPage++;

	getWallpapers(category, totalPage);
}
