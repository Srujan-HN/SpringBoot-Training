import { Link } from "react-router-dom";

export default function Contact() {
  return (
    <>
      <div>Contact Us</div>
      <Link to={"/home"}>Home page</Link>
    </>
  );
}
