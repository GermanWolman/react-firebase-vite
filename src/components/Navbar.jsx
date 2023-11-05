import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserProvider";

const Navbar = () => {
  const { user, logOutUser } = useContext(UserContext);
  const navegate = useNavigate();

  const handleLogout = async () => {
    try {
      console.log('cerrar');
      await logOutUser();
      navegate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {user ? (
        <>
          <NavLink to="/">Inicio</NavLink>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/register">Register</NavLink>
        </>
      )}
    </div>
  );
};

export default Navbar;
