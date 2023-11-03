import { useContext } from "react";
import { UserContext } from "../context/UserProvider";

const Login = () => {
  const { user, signIn, signOut } = useContext(UserContext);

  return (
    <div>
      <h1>Login</h1>
      <h2>{user ? "Conectado" : "Desconectado"}</h2>
      {user ? (
        <button
          className="btn btn-danger"
          onClick={signOut}
        >
          Cerrar sesión
        </button>
      ) : (
        <button
          className="btn btn-primary"
          onClick={signIn}
        >
          Iniciar sesión
        </button>
      )}
    </div>
  );
};

export default Login;
