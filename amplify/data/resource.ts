import { type ClientSchema, a, defineData } from "@aws-amplify/backend";
import { fetchHtml } from "../functions/fetchhtml";

const schema = a.schema({
	fetchHtml: a
		.query()
		.arguments({
			url: a.string().required(),
		})
		.returns(a.string())
		.handler(a.handler.function(fetchHtml))
		.authorization((allow) => allow.authenticated()),

	chat: a
		.conversation({
			aiModel: a.ai.model("Claude 3.5 Sonnet"),
			systemPrompt: `You are a helpful assistant who when given HTML input of news and gives out a brief summary, summary should contain a heading and a summary paragraph following that. disregard any irrelavant information from HTML and only focus on the information.`,
		})
		.authorization((allow) => allow.owner()),

	chatNamer: a
		.generation({
			aiModel: a.ai.model("Claude 3 Haiku"),
			systemPrompt: `You are a helpful assistant that writes descriptive names for conversations. Names should be 2-10 words long`,
		})
		.arguments({
			content: a.string(),
		})
		.returns(
			a.customType({
				name: a.string(),
			})
		)
		.authorization((allow) => [allow.authenticated()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
	schema,
	authorizationModes: {
		defaultAuthorizationMode: "userPool",
	},
});
