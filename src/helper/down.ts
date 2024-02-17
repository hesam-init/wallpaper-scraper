import { ensureFile, exists } from "fs";
import cliProgress from "progress";

export async function downloadFile(url: string, dest?: string) {
	if (!url.startsWith("https://") && !url.startsWith("http://")) {
		throw new TypeError("URL must start with be http:// or https://");
	}

	const finalDes = dest || "./download";
	const fileName = url.split("/").pop();
	const fileExist = await exists(`${finalDes}/${fileName}`);

	const bar = new cliProgress.SingleBar({
		format: `${fileName} {bar} {percentage}%`,
	}, cliProgress.Presets.legacy);

	bar.start(100, 0);

	if (fileExist) {
		return false;
	}

	try {
		const resp = await fetch(url);

		if (!resp.ok) {
			throw new Deno.errors.BadResource(
				`Request failed with status ${resp.status}`,
			);
		}

		if (!resp.body) {
			throw new Deno.errors.UnexpectedEof(
				`The download url ${url} doesn't contain a file to download`,
			);
		}

		await ensureFile(`${finalDes}/${fileName}`);

		const file = await Deno.open(`${finalDes}/${fileName}`, {
			truncate: true,
			write: true,
		});

		const contentLength = parseInt(
			resp.headers.get("content-length") || "0",
		);
		let downloadedBytes = 0;

		const reader = resp.body.getReader();

		while (true) {
			const { done, value } = await reader.read();

			if (done) {
				bar.stop();
				break;
			}

			await file.write(value);

			downloadedBytes += value.length;
			const progress = (downloadedBytes / contentLength) * 100;

			bar.update(progress);
		}

		file.close();
	} catch (error) {
		Deno.exit(5);
	}
}
