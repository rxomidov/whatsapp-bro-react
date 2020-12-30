import React, {useEffect, useState} from 'react';
import './Chat.css'
import {Avatar, IconButton} from "@material-ui/core";
import {
    SearchOutlined, AttachFile, MoreVert,
    InsertEmoticon, Mic
} from "@material-ui/icons";
import {useParams} from 'react-router-dom';
import db from "../firebase";
import firebase from "firebase";
import {useStateValue} from "../StateProvider";

function Chat(props) {

    const [seed, setSeed] = useState('');
    const [input, setInput] = useState('');
    const {roomId} = useParams();
    const [roomName, setRomName] = useState('');
    const [messages, setMessages] = useState([]);
    const [{user}, dispatch] = useStateValue();

    useEffect(() => {
        if (roomId) {
            db.collection('rooms').doc(roomId).onSnapshot((snapshot) =>
                setRomName(snapshot.data().name));

            db.collection('rooms').doc(roomId)
                .collection('messages')
                .orderBy('timestamp', 'asc')
                .onSnapshot((snapshot) => (
                    setMessages(snapshot.docs.map((doc) => doc.data()))
                ))
        }
    }, [roomId])


    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));
    }, [roomId]);

    const sendMessage = (e) => {
        e.preventDefault();
        //console.log(input)

        db.collection('rooms').doc(roomId)
            .collection("messages").add({
            message: input,
            name: user.displayName,
            timestamp: firebase.firestore.FieldValue
                .serverTimestamp(),
        });

        // window.scroll({
        //     bottom: document.getElementsByClassName('chat-body').offsetHeight,
        //     left: 0,
        //     behavior: 'smooth',
        // });
        //console.log("why not scroll")

        setInput("");
    };

    return (
        <div className="chat">
            <div className="chat-header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
                <div className="chat-headerInfo">
                    <h3>{roomName}</h3>
                    <p>last seen{" "}
                        {new Date(messages[messages.length-1]?.
                        timestamp?.toDate()).toUTCString().slice(6,22)}
                    </p>
                </div>
                <div className="chat-headerRight">
                    <IconButton>
                        <SearchOutlined/>
                    </IconButton>
                    <IconButton>
                        <AttachFile/>
                    </IconButton>
                    <IconButton>
                        <MoreVert/>
                    </IconButton>
                </div>
            </div>
            <div className="chat-body">
                {messages.map((message) => (
                    <p className={`chat-message ${true && 'chat-receiver'}`}>
                        <span className="chat-name">{message.name}</span>
                        {message.message}
                        <span className="chat-timestamp">
                            {new Date(message.timestamp?.toDate())
                                .toUTCString().slice(6,22)}
                        </span>
                    </p>
                ))}

            </div>
            <div className="chat-footer">
                <InsertEmoticon/>
                <form action="">
                    <input value={input} onChange={e =>
                        setInput(e.target.value)}
                           placeholder="Type a message" type="text"/>
                    <button onClick={sendMessage}>
                        Send Message</button>
                </form>
                <Mic/>
            </div>
        </div>
    );
}

export default Chat;