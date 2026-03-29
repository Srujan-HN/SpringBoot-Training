import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [fruitInput, setFruitInput] = useState("");
  const [fruits, setFruits] = useState(() => {
    const saved = localStorage.getItem("fruits");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("fruits", JSON.stringify(fruits));
  }, [fruits]);

  const handleAddFruit = () => {
    if (fruitInput.trim() === "") return;
    setFruits([...fruits, fruitInput]);
    setFruitInput("");
  };

  const handleDelFruit = (index) => {
    const updated = fruits.filter((_, i) => i !== index);
    setFruits(updated);
  };

  return (
    <>
      <div>
        <h2>Home Page</h2>
        <Link to={"/"}>Home</Link>
        <Link to={"/about"}>About us</Link>
        <input
          type="text"
          placeholder="Enter fruit"
          value={fruitInput}
          onChange={(e) => setFruitInput(e.target.value)}
        />
        <button onClick={handleAddFruit}>Add fruits</button>
        <ul>
          {fruits.map((fruit, index) => (
            <li key={index}>
              {fruit}
              <button onClick={() => handleDelFruit(index)}>DEL {index}</button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
