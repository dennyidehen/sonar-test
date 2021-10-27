import React from 'react'

const Player = ({name, image, lastSeen}) => {
    return (
        <div className={`prize ${lastSeen}`}>
            <img width={"100px"} src={"http://localhost/lotterysystemb/public"+image} alt={"Player"}/>
            <div>{name}</div>
        </div>
    )
}

export default Player
