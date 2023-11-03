import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./routes/Home";
import NotFound from "./routes/NotFound";
import Protected from "./routes/Protected";
import Login from "./routes/Login";

import RequireAuth from "./components/RequireAuth";
//import { useContext } from "react";
//import { UserContext } from "./context/UserProvider";

const App = () => {
  //const { user } = useContext(UserContext);

  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="/login"
          element={<Login />}
        />
        <Route
          path="/protected"
          element={
            <RequireAuth>
              <Protected />
            </RequireAuth>
          }
        />
        <Route
          path="*"
          element={<NotFound />}
        />
      </Routes>
    </>
  );
};

export default App;
