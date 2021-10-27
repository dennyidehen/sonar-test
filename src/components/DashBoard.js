import React from 'react'
import GameCountDown from './GameCountDown'
import Players from './Players'
import Prizes from './Prizes'
import { useEffect, useState } from 'react'

const DashBoard = () => {

    const [state, setState] = useState({});

    useEffect(()=>{
        const interval = setInterval(() => {
            //updateOnlineStatus();
            //updateData();
        }, 30000);
        updateData();
        return () => {
            clearInterval(interval);
        }
    },[]);

    const updateData = () => {
        fetch("http://localhost/lotterysystemb/public/game",{
            headers:{
                Authorization: window.FB.getAuthResponse()['accessToken']
            }
        })
        .then(res => res.json())
        .then(result => {
            setState(result);
        });
    };

    const updateOnlineStatus = () => {
        fetch("http://localhost/lotterysystemb/public/user/update",{
            method:'PUT',
            headers:{
                Authorization: window.FB.getAuthResponse()['accessToken']
            }
        })
        .then(res => res.json())
        .then(result => {
            console.log(result);
        });
    };

    return (
        <div className="dashboard">
            <div className="dash-content">
                <GameCountDown game={state.game} update={updateData} />
                <Players players={state.players} />
                <Prizes prizes={state.prizes} />
            </div>
        </div>
    )
}

export default DashBoard
