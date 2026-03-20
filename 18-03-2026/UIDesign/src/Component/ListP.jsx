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
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Prime Number Checker</h2>

        <button onClick={checkPrimes} style={styles.button}>
          Check Numbers
        </button>

        <div style={styles.resultBox}>
          {result.map((item, index) => (
            <p key={index} style={styles.resultItem}>
              {item}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #1e3c72, #2a5298)",
    fontFamily: "Arial, sans-serif",
  },
  card: {
    background: "#ffffff",
    padding: "30px",
    borderRadius: "20px",
    boxShadow: "0 15px 35px rgba(0,0,0,0.3)",
    width: "350px",
    textAlign: "center",
    animation: "fadeIn 0.8s ease-in-out",
  },
  title: {
    marginBottom: "20px",
    color: "#333",
  },
  button: {
    padding: "12px 20px",
    borderRadius: "10px",
    border: "none",
    background: "linear-gradient(135deg, #ff416c, #ff4b2b)",
    color: "#fff",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  resultBox: {
    marginTop: "20px",
    maxHeight: "200px",
    overflowY: "auto",
  },
  resultItem: {
    padding: "8px",
    margin: "5px 0",
    borderRadius: "8px",
    background: "#f4f6f8",
    transition: "transform 0.3s, background 0.3s",
  },
};

/* Add this CSS in your index.css or App.css */
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(
  `
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px);}
  to { opacity: 1; transform: translateY(0);}
}
`,
  styleSheet.cssRules.length,
);

export default ListP;
