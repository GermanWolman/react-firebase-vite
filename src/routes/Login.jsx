import { useContext } from "react";
import { UserContext } from "../context/UserProvider";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { errorsFirebase } from "../utils/errorsFirebase";
import { formValidate } from "../utils/formValidate";

import FormAlert from "../components/FormAlert";
import FormInput from "../components/FormInput";
import Title from "../components/Title";
import Button from "../components/Button";
//import ButtonLoading from "../components/ButtonLoading";

const Login = () => {
  const { loginUser } = useContext(UserContext);
  const navegate = useNavigate();
  const { required, patternEmail, minLength, validateTrim } = formValidate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    defaultValues: {
      email: "gwolman2424@gmail.com",
      password: "123123",
    },
  });

  const onSubmit = async ({ email, password }) => {
    //setLoading(true);
    try {
      await loginUser(email, password);
      navegate("/");
    } catch (error) {
      const { code, message } = errorsFirebase(error.code);
      setError(code, { message });
    } finally {
      //setLoading(false);
    }
  };

  const buttonSubmit = 
    <Button
      text="Login"
      type="submit"
    />
  

  return (
    <>
      <Title text="Login" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          label="Ingresa tu correo"
          type="email"
          placeholder="Ingrese email"
          {...register("email", {
            required,
            pattern: patternEmail,
          })}
          error={errors.email}
        >
          <FormAlert error={errors.email} />
        </FormInput>

        <FormInput
          label="Ingresa contraseña"
          type="password"
          placeholder="Ingrese Password"
          {...register("password", {
            minLength,
            validate: validateTrim,
          })}
          error={errors.password}
        >
          <FormAlert error={errors.password} />
        </FormInput>

        {buttonSubmit}
      </form>
    </>
  );
};

export default Login;
