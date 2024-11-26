"use client";
import * as React from "react";
import {
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  TextField,
  View,
} from "@aws-amplify/ui-react";
import {
  LuCheck,
  LuMoreVertical,
  LuPencil,
  LuTrash2,
  LuX,
} from "react-icons/lu";

import { ConversationsContext } from "@/providers/ConversationsProvider";
import { Conversation } from "@/client";
import Link from "next/link";
import "./ConversationItem.css";

interface FormElements extends HTMLFormControlsCollection {
  conversationName: HTMLInputElement;
}
interface ConversationFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

export const ConversationItem = ({
  conversation,
}: {
  conversation: Conversation;
}) => {
  const { deleteConversation, updateConversation } =
    React.useContext(ConversationsContext);
  const [editing, setEditing] = React.useState(false);

  const handleSubmit = (e: React.FormEvent<ConversationFormElement>) => {
    e.preventDefault();
    updateConversation({
      ...conversation,
      name: e.currentTarget.elements.conversationName.value,
    });
    setEditing(false);
  };

  return (
    <Flex className="conversation-item" direction="row" key={conversation.id} alignItems="center">
      <Flex className="conversation-content" direction="column" flex="1">
        {editing ? (
          <View as="form" onSubmit={handleSubmit} className="editing-form">
            <TextField
              label="Conversation name"
              name="conversationName"
              labelHidden
              defaultValue={conversation.name}
              variation="quiet"
              className="text-field"
              innerEndComponent={
                <>
                  <Button
                    size="small"
                    onClick={() => {
                      setEditing(false);
                    }}
                    variation="link"
                  >
                    <LuX />
                  </Button>
                  <Button size="small" type="submit" variation="link">
                    <LuCheck />
                  </Button>
                </>
              }
            />
          </View>
        ) : (
          <Link href={`/chat/${conversation.id}`} className="conversation-link">
            {conversation.name ?? conversation.id}
          </Link>
        )}
      </Flex>
      <Menu
        size="small"
        trigger={
          <MenuButton size="small">
            <LuMoreVertical />
          </MenuButton>
        }
      >
        <MenuItem className="menu-item" gap="xs" onClick={() => setEditing(!editing)}>
          <LuPencil />
          <span>Rename</span>
        </MenuItem>
        <MenuItem
          className="menu-item"
          gap="xs"
          onClick={() => deleteConversation({ id: conversation.id })}
        >
          <LuTrash2 />
          <span>Delete</span>
        </MenuItem>
      </Menu>
    </Flex>
  );
};
