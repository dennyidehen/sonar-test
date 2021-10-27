import React from 'react'
import { useEffect, useState } from 'react'

const GameCountDown = ({game, update}) => {
    const [state, setState] = useState({
        timeRun:"No time available"
    });

    useEffect(()=>{
        const timer = setInterval(()=>{
            setState({
                timeRun: formatTimeLeft(getTimeLeft(game.timeTo.date))
            });
        },1000);
        return ()=>{clearInterval(timer);}
    },[game]);
    
    const formatTimeLeft = (timeTo = 0) => {
        let timeNowSec = (timeTo === 0) ? Date.now()/1000 : timeTo;
        let timeCalc = [(60*60*24*365),(60*60*24),(60*60),60,1];
        for(let i=0;i<timeCalc.length;i++){
            let tempCalc = timeCalc[i];
            let calculateEntity = timeNowSec/timeCalc[i];
            let timeEntity = Math.floor(calculateEntity)
            timeCalc[i] = (timeEntity < 10) ? "0"+timeEntity.toString() : timeEntity;
            timeNowSec -= timeEntity*tempCalc;
        }
        return `${timeCalc[1]}:${timeCalc[2]}:${timeCalc[3]}:${timeCalc[4]}`;
    }

    const getTimeLeft = (time) => {
        let testDate = Date.parse(time);
        return (testDate-Date.now())/1000;
    }

    const animate = (e) => {
        let currentClassName = e.currentTarget.className;
        let target = e.currentTarget;
        if(target.disabled) return;
        target.className += " bubble-click";
        target.disabled = true;
        setTimeout(()=>{
        target.className = currentClassName;
        target.disabled = false;
        },1000);
    };

    const handleClick = (e) => {
        if(e.button === 0 || e.button === 2)animate(e);
        if(e.button === 0){
            updatePlayer("POST");
        }else if(e.button === 2){
            updatePlayer("DELETE");
        }
    };

    const updatePlayer = ($method) => {
        fetch("http://localhost/lotterysystemb/public/game/player",{
            method:$method,
            headers:{
                "Content-Length":0,
                Authorization:window.FB.getAuthResponse()['accessToken']
            }
        })
        .then(res => res.json())
        .then(result => {
            update();
        });
    }

    return (
        <div className="dash1" onMouseDown={handleClick}>
            <div>Count down to next game</div>
            <div>{state.timeRun}</div>
        </div>
    )
}
GameCountDown.defaultProps = {
    game:{
        timeTo:{date:"00"},
        timeSince:{date:"00"},
        gameStatus:false
    }
}
export default GameCountDown
