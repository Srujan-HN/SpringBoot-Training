import { useState } from "react";

function Calculator() {
  const [num1, setNum1] = useState();
  const [num2, setNum2] = useState();
  const [result, setResult] = useState(0);
  // function double(){

  //   setNum1(Number(num1)+Number(num1));

  // }
  const handleAdd = () => {
    setResult(Number(num1) + Number(num2));
  };

  const sub = () => {
    setResult(Number(num1) - Number(num2));
  };
  const mul = () => {
    setResult(Number(num1) * Number(num2));
  };
  const divide = () => {
    setResult(Number(num1) / Number(num2));
  };

  return (
    <>
      <input
        type="number"
        value={num1}
        onChange={(e) => setNum1(e.target.value)}
      />
      <br></br>
      <input
        type="number"
        value={num2}
        onChange={(e) => setNum2(e.target.value)}
      />
      <br></br>

      <button onClick={handleAdd}>Add</button>
      <button onClick={sub}>Sub</button>
      <button onClick={mul}>Mul</button>
      <button onClick={divide}>Divide</button>

      <h1>{result}</h1>
    </>
  );
}
export default Calculator;
