import React from 'react'
import Prize from './Prize'

const Prizes = ({prizes}) => {

    const gamePrizes = () => {
        if(typeof(prizes) !== "undefined"){
            let prizeList = prizes;
            return prizeList.map((prize, index)=>{
                return (<Prize key={index} name={prize.name} src={prize.image}/>)
            });
        }
    }
    return (
        <div className="dash3">
            {gamePrizes()}
        </div>
    )
}

export default Prizes
