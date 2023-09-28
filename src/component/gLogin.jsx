import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import axios from 'axios';
import './glogin.css';

export default function Login() {
  const myStyle = {
    width: "224px",
  }

  return (
    <div className="container">
      <div style={myStyle} className="googleAuthDiv">
        <GoogleOAuthProvider clientId="1036325756489-o1iinvilskj04u8ufnrop9guokvqe5f0.apps.googleusercontent.com">
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              // console.log(credentialResponse);
              // console.log(credentialResponse.credential)
              const headers = {
                'x-access-token': credentialResponse.credential,
              };
              axios.get('http://localhost:8080/api/authBearer', { headers })
                .then(response => {
                  console.log(response);
                  localStorage.setItem('isEmployee', response.data.isEmployee);
                  localStorage.setItem('bearerToken', response.data.token);
                  localStorage.setItem('loginType', response.data.loginType)
                  window.location.href = 'https://auditblock.in/';
                })
                .catch(error => {
                  alert(error);
                  // Handle errors
                });
            }}
            onError={() => {
              console.log("Login Failed");
            }}
          />
        </GoogleOAuthProvider>
      </div>
    </div>
  );
}
