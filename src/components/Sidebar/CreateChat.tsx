"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@aws-amplify/ui-react";


export const CreateChat = () => {
  const router = useRouter();
  // const { createConversation } = React.useContext(ConversationsContext);

  const handleClick = async () => {
      router.push(`/`);
    
  };
  return <Button onClick={handleClick}>Create chat</Button>;
};