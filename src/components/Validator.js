export async function validateToken(url, token, serviceId="", userId="", serviceName=""){
    const promise = new Promise( (resolve, reject) => {
        fetch(url,{
            method: 'POST',
            headers:{
                Authorization:token
            },
            body: JSON.stringify({
                clientId:serviceId,
                tokenId:token,
                userId:userId
            }),
        }).then(res => res.json()).then(
                (result) => {
                    console.log(result);
                    resolve(result);
            });
    });
    return promise;
}

export async function facebookInit(){
    const promise = new Promise( (resolve, reject) => {
        window.fbAsyncInit = function() {
            window.FB.init({
              appId      : '231626102107817',
              cookie     : true,
              xfbml      : true,
              version    : 'v11.0'
            });
            window.FB.AppEvents.logPageView();
            resolve(window.FB);
          };
          (function(d, s, id){
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {return;}
            js = d.createElement(s); js.id = id;
            js.src = "https://connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
          }(document, 'script', 'facebook-jssdk'));
    });
    return promise;
}

export const clientId = "932280642055-otit2e87bt0uohuodjhn5fqjvfvm64nd.apps.googleusercontent.com";
export const gUrl = "http://localhost/lotterysystemb/public/oauth/google";
export const appId = "231626102107817";
export const fUrl = "http://localhost/lotterysystemb/public/oauth/facebook";