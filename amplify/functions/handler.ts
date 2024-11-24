import { Schema } from "../data/resource";
import * as cheerio from "cheerio";

export const handler: Schema["fetchHtml"]["functionHandler"] = async (event) => {
	// your function code goes here
	const { url } = event.arguments;
	const response = await fetch(url);
	const html = await response.text();

	const $ = cheerio.load(html);

	// Remove style tags
	$("style").remove();

	// Extract body content
	const content = $("body").text().trim();

	if (!content) {
		return html;
	}
	// Return the cleaned content
	return content;
};
