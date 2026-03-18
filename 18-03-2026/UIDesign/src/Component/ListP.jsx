import { useState } from "react";

function ListP() {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const [result, setResult] = useState([]);

  const checkPrimes = () => {
    let temp = [];

    for (let i = 0; i < numbers.length; i++) {
      let n = numbers[i];
      let isPrime = true;

      if (n === 0 || n === 1) {
        isPrime = false;
      } else {
        for (let j = 2; j <= Math.sqrt(n); j++) {
          if (n % j === 0) {
            isPrime = false;
            break;
          }
        }
      }
      temp.push(numbers[i] + " is " + (isPrime ? "Prime" : "Not Prime"));
    }

    setResult(temp);
  };

  return (
    <div>
      <button onClick={checkPrimes}>Check</button>

      <h1>
        {result.map((item, index) => (
          <p key={index}>{item}</p>
        ))}
      </h1>
    </div>
  );
}
export default ListP;
