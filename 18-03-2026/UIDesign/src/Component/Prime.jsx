import { useState } from "react";

function Prime() {
  const [num, setNum] = useState(0);
  const [result, setResult] = useState(null);
  const check = () => {
    if (num == 0 || num == 1) {
      setResult(false);
    } else {
      for (let i = 2; i < num / 2+1 ; i++) {
        if (num % i == 0) {
          setResult(false);
          break
        } else {
          setResult(true);
        }
      }
    }
  };
  return (
    <>
      <div>Prime Number</div>
      <input
        type="number"
        placeholder="Enter Number"
        onChange={(e) => setNum(e.target.value)}
      />
      <button onClick={check}>Check</button>
      <div>{result ? "Prime" : "Not Prime"}</div>
    </>
  );
}
export default Prime;
