import { useState, useEffect } from "react";
import axios from "axios";
import Add from "./components/Add";

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8080/hello")
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    // <div>
    //   <h1>{data?.message}</h1>
    //   <p>{data?.description}</p>
    // </div>
    <Add/>
  );
}

export default App;