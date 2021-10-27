import React from 'react';
import Login from './Login'

const HomePage = ({loggedHandler}) => {

    const loggedInRedirect = () => {
        loggedHandler(true,"/user");
    }
    
    return (
        <div className="home-page">
            <div>Tak přesně tady bude nějaký text</div>
            <Login handler={loggedInRedirect}/>
        </div>
    )
}

export default HomePage
