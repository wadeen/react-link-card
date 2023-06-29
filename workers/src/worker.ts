export default {
	async fetch(request: Request): Promise<Response> {
		const url = new URL(request.url);

		const targetUrl = url.searchParams.get('url');

		if (!targetUrl) {
			return new Response('URL parameter is missing', { status: 400 });
		}

		const resultFetchUrl = await fetch(targetUrl);

		const ogpElementHandler = new OgpElementHandler();
		const htmlRewriter = new HTMLRewriter().on('meta', ogpElementHandler).transform(resultFetchUrl);
		await htmlRewriter.text();

		const response = new Response(JSON.stringify(ogpElementHandler), {
			headers: {
				'content-type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT',
				'Cache-Control': 'public, max-age=604800, s-maxage=604800', // 7 days
			},
		});
		return response;
	},
};

class OgpElementHandler {
	ogTitle: string | undefined;
	ogDescription: string | undefined;
	ogImage: string | undefined;
	element(element: Element) {
		if (element.tagName === 'meta') {
			switch (element.getAttribute('property')) {
				case 'og:title':
					this.ogTitle = element.getAttribute('content') ?? '';
					break;
				case 'og:description':
					this.ogDescription = element.getAttribute('content') ?? '';
				default:
					break;
				case 'og:image':
					this.ogImage = element.getAttribute('content') ?? '';
					break;
			}
		}
	}
}
