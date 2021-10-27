import React from 'react'
import { useHistory } from 'react-router';
import { useEffect, useState } from 'react';

const ControlPanel = () => {
    const history = useHistory();
    const [state, setState] = useState({
        userName: "NAME",
        image: "x"
    });

    useEffect(() => {
        window.FB.api("/me",{fields:"first_name,picture"},(response)=>{
            setState({
                userName: response.first_name,
                image: response.picture.data.url
            });
        })
        return () => {
            //
        }
    }, [])

    return (
        <div className="control">
            <div>{state.userName}</div>
            <img src={state.image} alt={"User"}/>
            <button onClick={()=>{
                window.FB.logout();
                history.replace("/");
            }}>Log out</button>
        </div>
    )
}

export default ControlPanel
