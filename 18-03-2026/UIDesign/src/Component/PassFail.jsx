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
      <div style={styles.container}>
        <div style={styles.card}>
          <h2 style={styles.title}>Result Checker</h2>

          <div style={styles.label}>Enter the marks:</div>

          <input
            type="number"
            value={marks}
            onChange={(e) => setMarks(e.target.value)}
            style={styles.input}
            placeholder="Enter marks"
          />

          <button onClick={checkList} style={styles.button}>
            Check Result
          </button>

          <h3 style={styles.result}>{result}</h3>
        </div>
      </div>
    </>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    fontFamily: "Arial, sans-serif",
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
  label: {
    marginBottom: "10px",
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    marginBottom: "20px",
    outline: "none",
    fontSize: "16px",
  },
  button: {
    width: "100%",
    padding: "10px",
    borderRadius: "8px",
    border: "none",
    background: "linear-gradient(135deg, #ff7e5f, #feb47b)",
    color: "#fff",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "0.3s",
  },
  result: {
    marginTop: "20px",
    color: "#444",
  },
};

export default PassFail;
