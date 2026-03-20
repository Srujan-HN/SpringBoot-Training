import { useState } from "react";

function Prime() {
  const [num, setNum] = useState(0);
  const [result, setResult] = useState(null);

  const check = () => {
    if (num == 0 || num == 1) {
      setResult(false);
    } else {
      let isPrime = true;

      for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i == 0) {
          isPrime = false;
          break;
        }
      }

      setResult(isPrime);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>🔢 Prime Number Checker</h2>

        <input
          type="number"
          placeholder="Enter Number"
          onChange={(e) => setNum(e.target.value)}
          style={styles.input}
        />

        <button
          onClick={check}
          style={styles.button}
          onMouseOver={(e) => (e.target.style.transform = "scale(1.07)")}
          onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
        >
          Check
        </button>

        {result !== null && (
          <div
            style={{
              ...styles.result,
              color: result ? "#22c55e" : "#ef4444",
            }}
          >
            {result ? "✔ Prime" : "✖ Not Prime"}
          </div>
        )}
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
    background: "linear-gradient(135deg, #1d2671, #c33764)",
    fontFamily: "Arial, sans-serif",
  },
  card: {
    background: "#ffffff",
    padding: "35px",
    borderRadius: "20px",
    boxShadow: "0 15px 40px rgba(0,0,0,0.3)",
    textAlign: "center",
    width: "320px",
  },
  title: {
    marginBottom: "20px",
    color: "#333",
  },
  input: {
    width: "100%",
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #ccc",
    marginBottom: "20px",
    fontSize: "16px",
    outline: "none",
  },
  button: {
    width: "100%",
    padding: "12px",
    borderRadius: "10px",
    border: "none",
    background: "linear-gradient(135deg, #ff512f, #dd2476)",
    color: "#fff",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "all 0.3s ease",
    boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
  },
  result: {
    marginTop: "20px",
    fontSize: "18px",
    fontWeight: "bold",
    transition: "0.3s",
  },
};

export default Prime;
