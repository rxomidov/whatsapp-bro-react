import React, {useEffect, useState} from 'react';
import './Sidebar.css'
import {Avatar, IconButton} from "@material-ui/core";
import {DonutLarge, Chat, MoreVert, SearchOutlined} from "@material-ui/icons";
import SidebarChat from "./SidebarChat";
import db from "../firebase";
import {useStateValue} from "../StateProvider";

function Sidebar({isOpen, toggle}) {
    const [rooms, setRooms] = useState([]);
    const [{ user }, dispatch] = useStateValue();

    useEffect(()=>{
        const unsubscribe = db.collection('rooms').onSnapshot(snapshot => {
            setRooms(snapshot.docs.map(doc=>({
                id: doc.id,
                data: doc.data()
            })))
        })
        return ()=>{
            unsubscribe();
        }
    },[])

    return <>
        <div className={`sidebar ${isOpen && "disnone"}`}>
            <div className="sidebar-header">
                <Avatar src={user?.photoURL}/>
                <div className="sidebar-headerRight">
                    <IconButton>
                        <DonutLarge/>
                    </IconButton>
                    <IconButton>
                        <Chat/>
                    </IconButton>
                    <IconButton>
                        <MoreVert/>
                    </IconButton>
                </div>
            </div>
            <div className="sidebar-search">
                <div className="sidebar-searchContainer">
                    <SearchOutlined/>
                    <input type="text" placeholder="Search or start new chat"/>
                </div>
            </div>
            <div className="sidebar__chats" isOpen={isOpen} onClick={toggle}>
                <SidebarChat addNewChat/>
                {rooms.map(room=>(
                    <SidebarChat key={room.id}
                                 id={room.id} name={room.data.name}/>
                ))}
            </div>
        </div>
    </>

}

export default Sidebar;