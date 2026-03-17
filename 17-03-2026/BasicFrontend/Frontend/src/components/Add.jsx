import { useState } from "react";
import axios from "axios";

function Add() {

  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [result, setResult] = useState(null);

  const handleAddition = (e) => {
    e.preventDefault();

    axios.
    post("http://localhost:8080/addition", {
      a: parseInt(a),
      b: parseInt(b)
    })
    .then((res) => {
      console.log(res.data);
      setResult(res.data.data);
    })
    .catch((err) => console.log(err));

  };

  return (
    <div>

      <h2>Addition</h2>

      <input
        type="number"
        placeholder="Enter A"
        value={a}
        onChange={(e) => setA(e.target.value)}
      />

      <input
        type="number"
        placeholder="Enter B"
        value={b}
        onChange={(e) => setB(e.target.value)}
      />

      <button onClick={handleAddition}>Add</button>

      {result !== null && (
        <h3>{result.a} + {result.b} = {result.result} </h3>
      )}

    </div>
  );
}
export default Add;