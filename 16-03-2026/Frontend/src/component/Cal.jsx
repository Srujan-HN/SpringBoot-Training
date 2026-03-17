import { useState } from "react";

function Cal() {
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState("");
  const calculate = () => {
    try {
      setResult(eval(expression));
    } catch (error) {
      setResult("InvalidEpression");
    }
  };

  return (
    <>
      <input
        type="text"
        placeholder="(5*3+9)"
        value={expression}
        onChange={(e) => setExpression(e.target.value)}
      />
      <button onClick={calculate}>Calculate</button>
      <h1>{result}</h1>
    </>
  );
}
export default Cal;
