import { useEffect, useState } from "react";
import Title from "../components/Title";
import { useFirestoreState } from "../hooks/useFirestoreState";
import { Button } from "flowbite-react";
const Home = () => {
  const { data, loading, error, getData, addData, deleteData, updateData   } = useFirestoreState();
  const [url, setUrl] = useState("");
  const [docEdit, setDocEdit] = useState();

  useEffect(() => {
    console.log("getData");
    getData();
  }, []);

  const loadingData = loading.getData && <p>Loading data...</p>;
  const errorData = error && <p>{error}</p>;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (docEdit) {
      await updateData(docEdit, url);
      setDocEdit();
      setUrl("");
      return;
    }
    await addData(url);
    setUrl("");
    };

    const handleButtonDelete = async (nanoid) => {
        await deleteData(nanoid);
    };
    const handleButtonEdit = (nanoid, origin) => {
      setDocEdit(nanoid);
      setUrl(origin);
    };
    

  return (
    <>
      <Title text="Home" />
      {loadingData}
      {errorData}
      <form onSubmit={handleSubmit}>
          <input
              type="text"
              placeholder="Ingresa una URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
          />
      
        {data?.map(({ nanoid, origin }) => (
          <div key={nanoid}>
                <p>{origin}</p>
                <button onClick={() => handleButtonEdit(nanoid, origin)}>Editar</button>
                <Button
  text="Eliminar"
  type="button"
  loading={loading[nanoid]}
  color="red"
  onClick={() => handleButtonDelete(nanoid)}
/>

                <button onClick={() => handleButtonDelete(nanoid)}>
                    Eliminar
                </button>
            </div>
        ))}

      
      </form>
      


      
    </>
  );
};




export default Home;
