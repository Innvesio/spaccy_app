import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import env from "../constants/env";
import { AuthContext } from "./AuthContext";
import { io } from "socket.io-client";

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [chats, setChats] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [currentConversation, setCurrentConversation] = useState({});
  const [messages, setMessages] = useState([]);
  const [receiverId, setReceiverId] = useState(null);
  const [socket, setSocket] = useState(null);
  const [getMessageIsLoading, setGetMessageIsLoading] = useState(false);
  const [currentConvoMessages, setCurrentConvoMessage] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState({
    senderId: "",
    createdAt: "",
    messageType: "",
    message: "",
    invoiceDetails: {
      additionalCost: "",
      extra: "",
      cost: "",
      comment: "",
      yourServices: [],
    },
  });
  const [newMessage, setNewMessage] = useState({
    messageType: "",
    message: "",
    bookingDetails: {
      numberOfGeusts: "",
      type: "",
    },
    invoiceDetails: {
      extra: "",
      cost: "",
      comment: "",
      yourServices: [],
    },
  });

  useEffect(() => {
    setSocket(io("http://192.168.8.100:8000"));
  }, []);

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
    setGetMessageIsLoading(true);
    axios
      .get(`${env.API_URL}/chat/conversations`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setGetMessageIsLoading(false);
        setConversations(res.data.data);
      })
      .catch((err) => {
        setGetMessageIsLoading(false);
        console.log(err.response.data);
      });
  };

  // Function to get all conversations
  const sendMessage = (type, convoId) => {
    const details = {
      message: newMessage.message,
      conversationId: convoId || currentConversation._id,
      messageType: type || "text",
    };
    socket.emit?.("send_message", {
      senderId: user.data._id,
      receiverId: receiverId,
      message: newMessage.message,
      invoiceDetails: newMessage.invoiceDetails,
      messageType: "text",
      bookingDetails: newMessage.bookingDetails,
    });
    axios
      .post(`${env.API_URL}/chat/send`, details, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((res) => {
        setNewMessage((prev) => ({ ...prev, message: "" }));
        getAllConvoChats(currentConversation._id);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  const createConvasation = (
    type,
    mainId,
    receiverId,
    Eventdetails,
    name,
    navigation
  ) => {
    const details = {
      receiverId: receiverId,
      bookingDetails: {
        type: type,
        mainId: mainId,
        eventStartTime: Eventdetails.eventStartTime,
        eventEndTime: Eventdetails.eventEndTime,
        numberOfGuests: Eventdetails.numberOfGuests,
        eventDate: Eventdetails.eventDate,
        eventType: Eventdetails.eventType,
        eventTitle: Eventdetails.eventTitle,
        bookedName: name,
      },
    };

    axios
      .post(`${env.API_URL}/chat/create/convo`, details, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((res) => {
        setCurrentConversation(res.data.data);
        sendMessage("text", res.data.data._id);
        navigation.navigate("Messages");
      })
      .catch((err) => console.log(err.response.data));
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
        socket,
        createConvasation,
        arrivalMessage,
        setArrivalMessage,
        setReceiverId,
        receiverId,
        getMessageIsLoading,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
