clearCache();

async function clearCache() {
	try {
		await Deno.remove("db.sqlite");
		console.log("cache removed !");
	} catch (err) {
		console.log("no cache to clear !");

		if (!(err instanceof Deno.errors.NotFound)) {
			throw err;
		}
	}
}
