import React from 'react'

const Prize = ( {src, name} ) => {
    return (
        <div className="prize">
            <img height={"100px"} src={"http://localhost/lotterysystemb/public"+src} alt={"Prize"}/>
            <div>{name}</div>
        </div>
    )
}
Prize.defaultProps = {
    src:"",
    name:"Name of prize",
}
export default Prize
