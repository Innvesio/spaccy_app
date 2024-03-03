import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import env from "../constants/env";
import { AuthContext } from "./AuthContext";

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [chats, setChats] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [currentConversation, setCurrentConversation] = useState({});
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
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
      .get(`${env.API_URL}/chat/${convoId}/all`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((res) => {
        console.log("Chats", res.data);
        setCurrentConvoMessage(res.data.data);
        setMessages(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Function to get all conversations
  const getAllCoversations = () => {
    axios
      .get(`${env.API_URL}/chat/conversations`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setConversations(res.data.data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  // Function to get all conversations
  const sendMessage = (convoId) => {
    const msg = {
      senderId: user.data._id,
      message: newMessage,
      conversationId: convoId || currentConversation._id,
      messageType: "text",
      createdAt: new Date(),
    };
    setMessages((prev) => [...prev, msg]);
    const details = {
      message: newMessage,
      conversationId: convoId || currentConversation._id,
      messageType: "text",
    };
    axios
      .post(`${env.API_URL}/chat/send`, details, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((res) => {
        setNewMessage("");
        getAllConvoChats(currentConversation._id);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  useEffect(() => {
    getAllCoversations();
  }, []);

  return (
    <ChatContext.Provider
      value={{
        chats,
        setChats,
        sendMessage,
        newMessage,
        setNewMessage,
        messages,
        setMessages,
        getAllConvoChats,
        conversations,
        setConversations,
        currentConversation,
        getAllCoversations,
        setCurrentConversation,
        currentConvoMessages,
        setCurrentConvoMessage,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
