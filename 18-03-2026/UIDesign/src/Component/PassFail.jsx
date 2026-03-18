import { useState } from "react";
import { z } from "zod";

function PassFail() {
  const [marks, setMarks] = useState("");
  const [result, setResult] = useState("");

  const schema = z.number().min(0).max(100);

  const checkList = () => {
    const parsedNumber = Number(marks);
    const validation = schema.safeParse(parsedNumber);

    if (!validation.success) {
      setResult("Invalid Marks");
      return;
    }

    if (parsedNumber >= 35) {
      setResult("Pass");
    } else {
      setResult("Fail");
    }
  };

  return (
    <>
      <div>Enter the marks:</div>
      <input
        type="number"
        value={marks}
        onChange={(e) => setMarks(e.target.value)}
      />
      <button onClick={checkList}>Check</button>
      <h3>{result}</h3>
    </>
  );
}

export default PassFail;
