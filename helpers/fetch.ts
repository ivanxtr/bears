export const fetcher = async (url: string, options?: Record<string, never>) => {
	try {
		const response = await fetch(url, options);
		const data = await response.json();
		return data;
	} catch (error) {
		return error;
	}
};
