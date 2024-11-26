"use client";

import * as React from "react";
import { ConversationsContext } from "@/providers/ConversationsProvider";
import { Button, Flex, TextAreaField } from "@aws-amplify/ui-react";
import { useRouter } from "next/navigation";
import "./page.css";

import { generateClient } from "aws-amplify/api"
import outputs from "../../amplify_outputs.json"
import { Amplify } from "aws-amplify";
import { Schema } from "../../amplify/data/resource";

Amplify.configure(outputs)

const client = generateClient<Schema>()

export default function Home() {
  const { createConversation, updateConversation } = React.useContext(ConversationsContext);
  const router = useRouter();
  // we would need to use a plain textarea field
  // on submit we would need to:
  // 1. create a conversation
  // 2. after creation, we need to update the URL
  // and send the first message to the conversation
  // then load the conversation

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const prompt = data.get("message") as string;
    

    const {data:html} = await client.queries.fetchHtml({url: prompt})


    createConversation().then((conversation) => {
      if (!conversation) return;
      if (!conversation?.name || conversation.name === conversation.id) {
        client.generations
          .chatNamer({
            content: `${prompt}`,
          })
          .then((res) => {
            updateConversation({
              id:conversation?.id,
              name: res.data?.name ?? "",
            });
          });
      }

      router.push(`/chat/${conversation.id}`);
      conversation?.sendMessage({ content: [{ text: `${prompt} + ${html}` }] });
    });
  };

  return (
    <Flex className="main-container" direction="column">
      <h1 className="header">Hello, Cloud 650 Class 👋</h1>
      <h2>Enter a news article link below for summary and follow up questions</h2>
      <Flex className="form-container" as="form" onSubmit={handleSubmit}>
        <TextAreaField className="message-field" name="message" autoResize label="message" labelHidden />
        <Button className="submit-button" type="submit">Send</Button>
      </Flex>
    </Flex>
  );
}
