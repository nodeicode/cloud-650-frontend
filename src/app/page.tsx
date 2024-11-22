"use client";

import * as React from "react";
import { ConversationsContext } from "@/providers/ConversationsProvider";
import { Button, Flex, TextAreaField } from "@aws-amplify/ui-react";
import { useRouter } from "next/navigation";
import "./page.css";

export default function Home() {
  const { createConversation } = React.useContext(ConversationsContext);
  const router = useRouter();
  // we would need to use a plain textarea field
  // on submit we would need to:
  // 1. create a conversation
  // 2. after creation, we need to update the URL
  // and send the first message to the conversation
  // then load the conversation

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const prompt = data.get("message") as string;
    console.log(prompt);
    createConversation().then((conversation) => {
      if (!conversation) return;
      router.push(`/chat/${conversation.id}`);
      conversation?.sendMessage({ content: [{ text: prompt }] });
    });
  };

  return (
    <Flex className="main-container" direction="column">
      <h1 className="header">Let's summarize some news!</h1>
      <Flex className="form-container" as="form" onSubmit={handleSubmit}>
        <TextAreaField className="message-field" name="message" autoResize label="message" labelHidden placeholder="Please enter a link here..." />
        <Button className="submit-button" type="submit">Send</Button>
      </Flex>
    </Flex>
  );
}
