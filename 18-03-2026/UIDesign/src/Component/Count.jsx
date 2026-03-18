import { useState } from "react";

function Count() {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };
  const decrement = () => {
    setCount(count - 1);
  };

  return (
    <>
      <div>total count:{count}</div>
      <button onClick={increment}>Add+1</button>

      <button onClick={decrement}>Sub-1</button>
    </>
  );
}
export default Count;
