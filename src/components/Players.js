import React from 'react'
import Player from './Player';

const Players = ({players}) => {

    const getOnlineStatus = (lastSeen) => {
        let status = "";
        if(lastSeen === null) return status;
        const time = Date.parse(lastSeen.date);
        if(((Date.now() - time)/1000) <= 120) status = "on-line";
        return status;
    }

    const gamePlayers = () => {
        if(typeof(players) !== 'undefined'){
            let users = players;
            return users.map((player, index)=>{
                const status = getOnlineStatus(player.lastSeen);
                return (<Player key={index} name={player.nickname} image={player.image} lastSeen={status} />)
            });
        }
    }
    return (
        <div className="dash2">
            {gamePlayers()}
        </div>
    )
}

export default Players
