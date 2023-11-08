import { errorsFirebase } from "../utils/errorsFirebase";
import { formValidate } from "../utils/formValidate";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import FormInput from "../components/FormInput";
import FormAlert from "../components/FormAlert";
//import { Button } from "flowbite-react";
import { useFirestoreState } from "../hooks/useFirestore";
import Button from "../components/Button";

const Home = () => {
  const { loading, data, error, getData, addData, deleteData, updateData } =
    useFirestoreState();

  const [newOriginID, setNewOriginID] = useState();
  const { required, patternUrl } = formValidate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    resetField,
    setValue,
  } = useForm();

  useEffect(() => {
    console.log("getData");
    getData();
  }, []);

  if (loading.getData) return <p>Loading data getData...</p>;
  if (error) return <p>{error}</p>;

  const onSubmit = async ({ url }) => {
    try {
      if (newOriginID) {
        await updateData(newOriginID, url);
      } else {
        await addData(url);
      }
      setNewOriginID("");
      resetField("url");
    } catch (error) {
      const { code, message } = errorsFirebase(error.code);
      setError(code, { message });
    }
  };

  const handleClickDelete = async (nanoid) => {
    await deleteData(nanoid);
  };

  const handleClickEdit = (item) => {
    setValue("url", item.origin);
    setNewOriginID(item.nanoid);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          label="Ingresa URL"
          placeholder="https://bluuweb.org/me-gusta-este-video"
          {...register("url", {
            required,
            pattern: patternUrl,
          })}
          error={errors.url}
        >
          <FormAlert error={errors.url} />
        </FormInput>

        {
  data.map((item) => (
    <article
      key={item.nanoid}
      className="p-6 bg-white rounded-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700 mb-3"
    >
      <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
        {window.location.href + item.nanoid}
      </h5>
      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
        {item.origin}
      </p>
      <div className="flex space-x-2">
        <Button
          type="button"
          text="Delete"
          color="red"
          loading={loading[item.nanoid]}
          onClick={() => handleClickDelete(item.nanoid)}
        />
        <Button
          type="button"
          text="Edit"
          color="yellow"
          onClick={() => handleClickEdit(item)}
        />
      </div>
    </article>
  ))
}

        
      </form>
    </>
  );
};

export default Home;
