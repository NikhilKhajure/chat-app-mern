import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios';
import styled from "styled-components";
import { allusersRoute, HOST } from '../utils/APIROUTES.JS';
import Contacts from '../components/Contacts'
import Welcome from '../components/Welcome';
import Chatcontainer from '../components/Chatcontainer';
import { io } from "socket.io-client";
function Chat() {
    const [contacts, setContacts] = useState([]);
    const [currentUser, setCurrentUser] = useState(undefined);
    const [currentChat, setCurrentChat] = useState(undefined);
    const socket = useRef();
    const getCurrentUser = async () => {
        if (!localStorage.getItem("chat-app-user")) {
            navigate("/login");
        } else {
            const userId = await JSON.parse(localStorage.getItem("chat-app-user"));
            setCurrentUser(userId);
        }
    }
    useEffect(() => {
        if (currentUser) {
            socket.current = io(HOST);
            socket.current.emit("add-user", currentUser._id);
        }
    }, [currentUser]);
    useEffect(() => {
        getCurrentUser();
    }, []);
    const getContacts = async () => {
        const id = currentUser._id;
        const data = await axios.get(`${allusersRoute}/${id}`);
        setContacts(data.data);
    }
    useEffect(() => {
        if (currentUser) {
            getContacts();
        }
    }, [currentUser]);
    const handleChatChange = (chat) => {
        setCurrentChat(chat);
    }
    return (
        <Container>
            <div className="container">
                <Contacts contacts={contacts} currentUser={currentUser} handleChatChange={handleChatChange} />
                {currentChat === undefined ? <Welcome currentUser={currentUser} /> : <Chatcontainer currentUser={currentUser} currentChat={currentChat} socket={socket} />}
            </div>
        </Container>
    )
}
const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;
export default Chat
