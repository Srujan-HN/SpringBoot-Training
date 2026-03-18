import { useState } from "react";

function State(){
    const[count,setCount]=useState(true);

    const s=()=>{
        setCount(!count)
    };

    return (
      <>
        <div>
          {count && <div>True</div>}
          {!count && <div>False</div>}
          <button onClick={s}>click</button>
        </div>
      </>
    );
}
export default State;