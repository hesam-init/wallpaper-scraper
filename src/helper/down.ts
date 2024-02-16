import { ensureFile, exists } from "fs";

export async function downloadFile(url: string, dest?: string) {
	const finalDes = dest || "./download";
	const fileName = url.split("/").pop();
	const fileExist = await exists(`${finalDes}/${fileName}`);

	if (fileExist) {
		throw new Deno.errors.AlreadyExists(
			`Image exist in ${finalDes}/${fileName}`,
		);
	}

	if (!url.startsWith("https://") || url.startsWith("http://")) {
		throw new TypeError("URL must start with be http:// or https://");
	}

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

	if (resp.status === 404) {
		throw new Deno.errors.NotFound(
			`The requested url "${url}" could not be found`,
		);
	}

	await ensureFile(`${finalDes}/${fileName}`);

	const file = await Deno.open(`${finalDes}/${fileName}`, {
		truncate: true,
		write: true,
	});

	await resp.body.pipeTo(file.writable);
}
