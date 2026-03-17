import { useState } from "react";

function AddNum() {
  const [num1, setNum1] = useState();
  const [num2, setNum2] = useState();
  const [result, setResult] = useState(0);
  // function double(){

  //   setNum1(Number(num1)+Number(num1));

  // }
  const handleAdd = () => {
    setResult(Number(num1) + Number(num2));
  };

  return (
    <>
      <input
        type="number"
        value={num1}
        onChange={(e) => setNum1(e.target.value)}
      />
      <input
        type="number"
        value={num2}
        onChange={(e) => setNum2(e.target.value)}
      />

      <button onClick={handleAdd}>Add</button>
      <h1>{result}</h1>
    </>
  );
}
export default AddNum;
