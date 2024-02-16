clearCache();

async function clearCache() {
	try {
		await Deno.remove("db.sqlite");
		console.log("Cache removed !");
	} catch (err) {
		console.log("No cache to remove !");

		if (!(err instanceof Deno.errors.NotFound)) {
			throw err;
		}
	}
}
