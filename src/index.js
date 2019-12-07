import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import ChatApi from "./chat-api";

import "./styles.css";

function App() {
  const [count, setCount] = useState(0);
  const [friendStatus, setFriendStatus] = useState(null);

  useEffect(() => {
    const handleStatus = status => {
      console.log("called", status);
      setFriendStatus(status);
    };
    ChatApi.subscribe(1, handleStatus);
    return () => {
      ChatApi.unsubscribe(handleStatus);
    };
  });
  return (
    <div className="App">
      <h1>Kalua : {count}</h1>
      <h1>Friend Status : {friendStatus}</h1>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
