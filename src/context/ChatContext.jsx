import axios from "axios";
import { createContext, useEffect, useState } from "react";
import env from "../constants/env";

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [chats, setChats] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [currentConversation, setCurrentConversation] = useState({});
  const [currentConvoMessages, setCurrentConvoMessage] = useState([]);

  const getAllConversations = () => {
    axios
      .get(`${env.API_URL}/v1/chat/conversations`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setConversations(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getAllConvoChats = (convoId) => {
    axios
      .get(`${env.API_URL}/v1/chat/${convoId}/all`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((res) => {
        setCurrentConvoMessage(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    // getAllChats();
  }, []);

  return (
    <ChatContext.Provider
      value={{
        chats,
        setChats,
        conversations,
        setConversations,
        currentConversation,
        setCurrentConversation,
        currentConvoMessages,
        setCurrentConvoMessage,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
