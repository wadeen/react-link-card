const workersOgHandler = async (request: Request): Promise<Response> => {
  const url = new URL(request.url);

  const targetUrl = url.searchParams.get("url");

  if (!targetUrl) {
    return new Response("URL parameter is missing", { status: 400 });
  }

  const resultFetchUrl = await fetch(targetUrl);

  const ogpElementHandler = new OgpElementHandler(targetUrl);
  const htmlRewriter = new HTMLRewriter().on("meta", ogpElementHandler).on("link", ogpElementHandler).transform(resultFetchUrl);
  await htmlRewriter.text();

  const responseJson = JSON.stringify(ogpElementHandler, (key, value) => (key === "baseHost" ? undefined : value));

  const response = new Response(responseJson, {
    headers: {
      "content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
      "Cache-Control": "public, max-age=604800, s-maxage=604800", // 7 days
    },
  });
  return response;
};

class OgpElementHandler {
  ogTitle: string | undefined;
  ogDescription: string | undefined;
  ogImage: string | undefined;
  favicon: string | undefined;
  private baseHost: string;

  constructor(baseHost: string) {
    this.baseHost = baseHost;
  }

  resolveUrl(path: string | undefined) {
    if (!path) return;
    if (path.startsWith("http")) {
      return path;
    } else {
      return this.baseHost + path;
    }
  }

  element(element: Element) {
    if (element.tagName === "meta") {
      switch (element.getAttribute("property")) {
        case "og:title":
          this.ogTitle = element.getAttribute("content") ?? "";
          break;
        case "og:description":
          this.ogDescription = element.getAttribute("content") ?? "";
          break;
        case "og:image":
          this.ogImage = this.resolveUrl(element.getAttribute("content") || "");
          break;
        default:
          break;
      }
    } else if (element.tagName === "link") {
      const rel = element.getAttribute("rel");
      if (rel === "icon") {
        this.favicon = this.resolveUrl(element.getAttribute("href") || "");
      }
    }
  }
}

export default workersOgHandler;
