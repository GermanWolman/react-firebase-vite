import ReactDOM from 'react-dom/client'
import App from './App.jsx'

//import reportWebVitals from "./reportWebVitals";

import { BrowserRouter } from "react-router-dom";
import UserProvider from "./context/UserProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <UserProvider>
      <App />
    </UserProvider>
  </BrowserRouter>,
);



//reportWebVitals();