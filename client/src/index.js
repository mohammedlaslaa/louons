import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App/App";
import {ToggleProvider} from "./context/TogglerContext"
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <ToggleProvider>
    <App />
  </ToggleProvider>,
  document.getElementById("root")
);
// ReactDOM.render(< />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

// fetch('http://localhost:5000/louons/api/v1/user', {
//   headers: new Headers({
//     'x-auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlNDk3NTAxODI3ZmQ0NGE3YzNkZTg1MiIsImFkbWluTGV2ZWwiOiJzdXBlcmFkbWluIiwiaWF0IjoxNTgzMDY2NDQ1LCJleHAiOjE1ODM2NzEyNDV9.0TektXywALFbeDYtoswx_1XBRvPtQAqfXrvZJzgZXqg'
//   })
// })
// .then(response => response.json())
// .then(data => {
//   console.log(data)
// })
// .catch(error => console.error(error))
