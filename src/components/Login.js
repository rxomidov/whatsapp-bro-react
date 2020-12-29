import React from 'react';
import logo from '../img/etherum.png'
import {Button} from "@material-ui/core";
import './Login.css'
import {auth, provider} from "../firebase";
import {useStateValue} from "../StateProvider";
import {actionTypes} from "../reducer";

function Login(props) {
    const [ {}, dispatch] = useStateValue();

    const signIn = () => {
        auth.signInWithPopup(provider)
            .then((result) => {
                dispatch({
                    type: actionTypes.SET_USER,
                    user: result.user,
                });
            })
            .catch((error) => alert(error.message));
    };

    return (
        <div className="login">
            <div className="login-container">
                <img src={logo} alt="logo"/>
                <div className="login-text">
                    <h1>Sign in to our App</h1>
                </div>
                <Button onClick={signIn} type="submit">
                    Sign In With Google
                </Button>
            </div>
        </div>
    );
}

export default Login;