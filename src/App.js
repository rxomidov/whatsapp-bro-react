import React, {useState} from "react";
import './App.css';
import Sidebar from "./components/Sidebar";
import Chat from "./components/Chat";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Login from "./components/Login";
import {useStateValue} from "./StateProvider";

function App() {
    const [{ user }, dispatch] = useStateValue();

    const [isOpen, setIsOpen] = useState(false);
    const toggle = () =>{
        setIsOpen(!isOpen);
    }

    return (
        <div className="App">
            {!user ? (
                <Login/>
            ) : (
                <div className="app-body">
                    <Router>
                        <Sidebar isOpen={isOpen} toggle={toggle}/>
                        <Switch>
                            <Route path="/rooms/:roomId">
                                <Chat/>
                            </Route>
                            <Route exact path="/">
                                {/*<Sidebar/>*/}
                                <Chat/>
                            </Route>
                        </Switch>
                    </Router>
                </div>
            )}
        </div>
    );
}

export default App;
