import React from 'react'
import { validateToken, fUrl } from './Validator';

const Login = ( {handler} ) => {
    const facebookText = "Continue with Facebook";

    const onLogin = () => {
        window.FB.login((response)=>{
            if(response.status === 'unknown') return;
            validateToken(fUrl,response.authResponse.accessToken,"",response.authResponse.userID)
            .then((backendResponse)=>{
                if(backendResponse.isValid){handler()};
            });
        });
    }

    return (
        <div className="login">
            {"Get in with"}
            <div className="loginBtn loginBtn--facebook" onClick={()=>{onLogin()}}>{facebookText}</div>
        </div>
    )
}

export default Login
