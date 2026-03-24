import { useState } from "react";
import About from "./About";

function NavBar() {
    const[show,setShow]=useState(false);
    const a=()=>{
        setShow(true);
    };
    
  return (
    <>
      <div className="flex justify-between px-5 py-3 bg-cyan-300">
        <div className="flex gap-5 ">
          <div>Logo</div>
          <div>SJCBM College</div>
        </div>

        <div className="flex gap-5">
          <div>Home</div>
          <div><button onClick={a}>About</button></div>
          <div>Contact</div>
        </div>
        <div className="flex gap-5">
          <div>Login</div>
          <div>SignUp</div>
        </div>
      </div>
      {show &&<About/>}
    </>
  );
}
export default NavBar;
