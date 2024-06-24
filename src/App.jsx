import { RouterProvider } from "react-router-dom";
import "./App.css";
import Router from "./Router";
import { createContext, useState } from "react";

export const Context = createContext();

function App() {
  const [creds, setCreds] = useState(JSON.parse(localStorage.getItem("credentials")));
  console.log(creds)
  return <Context.Provider value={[creds, setCreds]}><RouterProvider router={Router} /></Context.Provider>
}

export default App;