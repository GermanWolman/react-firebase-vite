import { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
//import Title from "../Title";
import { useFirestoreState } from "../hooks/useFirestore";
import Title from "./Title";

const LayoutRedirect = () => {
  const [loading, setLoading] = useState(true);
  const { searchData } = useFirestoreState();
  const params = useParams();

  useEffect(() => {
    searchData(params.nanoid).then((res) => {
      if (res.exists()) {
        console.log(res.data().origin)
        location.href = res.data().origin;
      } else {
        setLoading(false);
      }
    });
  }, []);

  if (loading) return <Title text="Cargando redirección..." />;

  return <Outlet />;
};

export default LayoutRedirect;
