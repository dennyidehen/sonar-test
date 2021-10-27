import './App.css';
import HomePage from './components/HomePage';
import UserPage from './components/UserPage';
import {Route, Switch, useHistory} from 'react-router-dom';
import {useEffect, useState} from 'react'
import {validateToken, fUrl, facebookInit} from './components/Validator'
import err404 from './components/err404';
import PrivateRoute from './components/PrivateRoute';

function App({location}) {
  const history = useHistory();
  const [state, setState] = useState({loggedIn:undefined});

  const setLogged = (isLogged, path) => {
    setState({loggedIn:isLogged});
    history.push(path);
  }

  useEffect(() => {
    console.log(window.location.pathname);
    window.oncontextmenu = (e) => {e.preventDefault();}

    facebookInit().then((FB)=>{
      autoLoginFacebookBackendValidation(FB);
    })
  },[])

  const autoLoginFacebookBackendValidation = (FB) => {
    FB.getLoginStatus((response)=>{
      //console.log(response.authResponse);
      if(response.status === 'connected'){
        let userId = response.authResponse.userID;
        let accessToken = response.authResponse.accessToken;
        validateToken(fUrl,accessToken,"",userId).then((backResponse)=>{
          if(backResponse.isValid){
            setLogged(true,"/user");
          }else{
            FB.logout();
            setLogged(false,"/");
          };
        });
      }else{
        setLogged(false,"/");
      }
    });
  }

  return (
    <>
    <Switch>
      <Route exact path="/"><HomePage loggedHandler={setLogged}/></Route>
      <PrivateRoute isLoggedIn={state.loggedIn} exact path="/user" component={UserPage}/>
      <Route component={err404}/>
    </Switch>
    </>
  );
}

export default App;
