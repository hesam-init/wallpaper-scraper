import inquirer from "inquirer";
import { getCategoriesPagination } from "$/src/rest/pagination/get-pagination.ts";

export async function selectTotalPage(category: string): Promise<number> {
	const totalPage = await getCategoriesPagination(category);

	const selectedPage = await inquirer.prompt([
		{
			type: "input",
			name: "page",
			message:
				`${totalPage} Total page, How much page do you want to scrape ?`,
			validate(value: any) {
				if (value < totalPage) {
					return true;
				}

				return "Please enter valid page";
			},
		},
	]);

	return Number(selectedPage.page);
}
