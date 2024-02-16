import ora from "spinner";

export type ProgressMessageType = {
	start: string;
	success?: string;
	failed?: string;
};

export async function withLoader<T>(
	messages: ProgressMessageType,
	task: () => Promise<T>,
): Promise<T> {
	const spinner = ora(messages.start).start();

	try {
		const result = await task();
		spinner.succeed(messages.success);
		return result;
	} catch (error) {
		spinner.fail(messages.failed);

		Deno.exit();
	}
}
