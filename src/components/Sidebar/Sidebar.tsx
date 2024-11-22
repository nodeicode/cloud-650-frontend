"use client";
import * as React from "react";
import { Flex, ScrollView } from "@aws-amplify/ui-react";
import { ConversationsContext } from "@/providers/ConversationsProvider";
import { ConversationItem } from "./ConversationItem";
import "./Sidebar.css";

export const Sidebar = ({ children }: React.PropsWithChildren) => {
  const { conversations } = React.useContext(ConversationsContext);

  return (
    <Flex className="sidebar-container" direction="column" width="500px" height="100%">
      <ScrollView flex="1">
        <Flex className="conversation-list" direction="column" padding="medium">
          {conversations.map((conversation) => (
            <ConversationItem
              key={conversation.id}
              conversation={conversation}
            />
          ))}
        </Flex>
      </ScrollView>
      <Flex className="children-container" direction="row" padding="large">
        {children}
      </Flex>
    </Flex>
  );
};
