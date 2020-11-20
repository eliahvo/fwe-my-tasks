import React, {useState} from "react";
import { Message, MessageType } from "./components/Message";
import "./styles.css";

export const App = () => {
  let [count, setCount] = useState(0);

  const onButtonClickListener = () => {
    console.log("clicked");
    setCount(count + 1);
  };

  return (
    <div className="container">
      <Message type={MessageType.INFO}>Hello World</Message>
      <p>Button was clicked {count} times</p>
      <button onClick={onButtonClickListener}>Click me!</button>
    </div>);
};