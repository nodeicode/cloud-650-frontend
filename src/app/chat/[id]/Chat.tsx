"use client";
import * as React from "react";
import { AIConversation } from "@aws-amplify/ui-react-ai";
import { View } from "@aws-amplify/ui-react";
import {  useAIConversation } from "@/client";
// import { ConversationsContext } from "@/providers/ConversationsProvider";
import ReactMarkdown from "react-markdown";

export const Chat = ({ id }: { id: string }) => {
  // const { updateConversation } = React.useContext(ConversationsContext);
  const [
    {
      data: { messages },
      isLoading,
    },
    sendMessage,
  ] = useAIConversation("chat", { id });

  return (
    <View padding="large" flex="1">
      <AIConversation
        allowAttachments
        messages={messages}
        handleSendMessage={(message) => {
          sendMessage(message);
        }}
        isLoading={isLoading}
        messageRenderer={{
          text: ({ text }) => <ReactMarkdown>{text}</ReactMarkdown>,
        }}
      />
    </View>
  );
};
