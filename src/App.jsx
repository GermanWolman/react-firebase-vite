import { Routes, Route } from "react-router-dom";

import Login from "./routes/Login";
import Home from "./routes/Home";
import Navbar from "./components/Navbar";
import RequireAuth from "./components/RequireAuth";
import Register from "./routes/Register";
import { useContext } from "react";
import { UserContext } from "./context/UserProvider";
import Layout404 from "./components/Layout404";
import AccessContainer from "./components/AccessContainer";

const App = () => {
  const { user } = useContext(UserContext);

  if (user === false) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={<RequireAuth />}
        >
          <Route
            index
            element={<Home />}
          />
        </Route>

        <Route
          path="/"
          element={<AccessContainer />}
        >
          <Route
            path="/login"
            element={<Login />}
          />
          <Route
            path="/register"
            element={<Register />}
          />
        </Route>


        <Route
          path="*"
          element={<Layout404 />}
        />
      </Routes>
    </>
  );
};

export default App;

