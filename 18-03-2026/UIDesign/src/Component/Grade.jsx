import { useState } from "react";

function Grade() {
  const [marks, setMarks] = useState("");
  const [grade, setGrade] = useState("");

  const g = () => {
    if (marks > 100 || marks < 0) {
      setGrade("Invalid Marks");
      return;
    }
    if (marks >= 90) {
      setGrade("A");
    } else if (marks >= 80) {
      setGrade("B");
    } else if (marks >= 70) {
      setGrade("C");
    } else if (marks >= 60) {
      setGrade("D");
    } else {
      setGrade("F");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>📊 Student Result</h2>

        <input
          type="number"
          placeholder="Enter your marks"
          onChange={(e) => setMarks(e.target.value)}
          style={styles.input}
        />

        <button onClick={g} style={styles.button}>
          Get Grade 🎯
        </button>

        <div style={styles.result}>
          Your Grade: <span style={styles.grade}>{grade}</span>
        </div>
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
    background: "linear-gradient(135deg, #36d1dc, #5b86e5)",
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
    background: "linear-gradient(135deg, #ff9966, #ff5e62)",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    cursor: "pointer",
  },
  result: {
    marginTop: "20px",
    fontSize: "18px",
  },
  grade: {
    fontWeight: "bold",
    fontSize: "22px",
    color: "#5b86e5",
  },
};

export default Grade;
