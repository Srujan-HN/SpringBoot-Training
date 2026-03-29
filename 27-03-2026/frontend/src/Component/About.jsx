import { Link } from "react-router-dom";

export default function About() {
  return (
    <>
      <div>About</div>
      <Link to={"/contact"}>Contact Us</Link>
    </>
  );
}
