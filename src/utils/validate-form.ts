import type { ZodObject } from "zod";

export function _validateFormComplete<T = unknown>(schema: ZodObject, data: T): Record<string, string> {
	const result = schema.safeParse(data);

	if (result.success) {
		return {};
	}

	const errors: Record<string, string> = {};

	result.error.issues.forEach((issue) => {
		const field = issue.path[0] as string;
		errors[field] = issue.message;
	});

	return errors;
}