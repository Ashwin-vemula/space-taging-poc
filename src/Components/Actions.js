import React, { useState } from "react";

export default function Actions({ name, handleAdd, handleDelete }) {
  const [inputVal, setInputVal] = useState("");

  return (
    <div>
      <div>{name}</div>
      <input onChange={({ target }) => setInputVal(target.value)} />
      <div>
        <button onClick={() => handleAdd(inputVal)}>Add</button>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
}
