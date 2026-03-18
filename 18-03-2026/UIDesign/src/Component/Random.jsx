import { useState } from "react";

function Random() {
  const [num, setNum] = useState("");
  const [result, setResult] = useState("");
  const [show, setShow] = useState("");

  const rand = () => {
    const random = Math.floor(Math.random() * 10);
    if (num == random) {
      setResult("Matched ✅");
      setShow("The random number is: " + random);
    } else {
      setResult("Not Matched ❌");
      setShow("The random number is: " + random);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>🎲 Random Number Game</h2>

        <input
          type="number"
          placeholder="Enter number (0-9)"
          onChange={(e) => setNum(e.target.value)}
          style={styles.input}
        />

        <button onClick={rand} style={styles.button}>
          Try Your Luck 🚀
        </button>

        <div style={styles.result}>{result}</div>
        <div style={styles.show}>{show}</div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    fontFamily: "Arial",
  },
  card: {
    background: "#fff",
    padding: "30px",
    borderRadius: "15px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
    textAlign: "center",
    width: "300px",
  },
  title: {
    marginBottom: "20px",
    color: "#333",
  },
  input: {
    padding: "12px",
    width: "100%",
    borderRadius: "8px",
    border: "1px solid #ccc",
    marginBottom: "15px",
    fontSize: "16px",
    outline: "none",
  },
  button: {
    padding: "12px",
    width: "100%",
    background: "linear-gradient(135deg, #ff7e5f, #feb47b)",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    cursor: "pointer",
    transition: "0.3s",
  },
  result: {
    marginTop: "20px",
    fontSize: "20px",
    fontWeight: "bold",
  },
  show: {
    marginTop: "10px",
    color: "#666",
    fontSize: "14px",
  },
};

export default Random;
