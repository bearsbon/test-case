import React, { useState } from "react";
import IMask from "imask";
import axios from "axios";

export default function App() {
  const [number, setNumber] = useState(null);

  const handleChange = (e) => {
    const mask = IMask(document.getElementById("masked"), {
      mask: "00-00-00",
    });
    setNumber(mask.value);
  };

  const CancelToken = axios.CancelToken;
  let source = CancelToken.source();
  const handleSubmit = () => {
    source && source.cancel("Last request was canceled");
    source = axios.CancelToken.source();

    axios
      .post(
        "http://localhost:3000/",
        { number: number },
        {
          cancelToken: source.token,
        }
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
        <input type="email" />
        <input id="masked" onChange={(e) => handleChange(e)} type="text" />
      </div>
      <div>
        <button onClick={(event) => handleSubmit(event)}>Submit</button>
      </div>
    </>
  );
}
